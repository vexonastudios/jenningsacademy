-- Supabase Schema for Jennings Academy

-- 1. Profiles (Children profiles linked to the Parent's Clerk User ID)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id TEXT NOT NULL, -- Clerk User ID
  name TEXT NOT NULL,
  avatar_url TEXT,
  grade_level INT DEFAULT 1,
  pin_code TEXT NOT NULL, -- 4 digit PIN
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Daily Plans (A track of what the child needs to accomplish on a given date)
CREATE TABLE daily_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  target_date DATE NOT NULL,
  modules JSONB NOT NULL, -- E.g., ['math', 'spelling', 'audiobook', 'game']
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Sessions (Track the actual performance/results of each module hit in the hub)
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  daily_plan_id UUID REFERENCES daily_plans(id) ON DELETE CASCADE,
  module_type TEXT NOT NULL, -- 'math', 'spelling', 'game'
  score INT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  mastery_progress FLOAT DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: Row Level Security (RLS) is disabled by default for these tables in Supabase.
-- Because parents use Clerk (and not Supabase Auth), all Database inserts/updates
-- should be securely funneled through Next.js Server Actions or API routes,
-- where we can verify `const { userId } = auth();` on the server before writing to Supabase.

-- ==========================================
-- PHASE 3.5: Caching & Advanced Profiles Update
-- ==========================================

-- A. Add Advanced Configuration to Profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS voice_id TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS school_days JSONB;

-- B. Voice Cache Ledger (Lightning fast checks before querying storage buckets)
CREATE TABLE voice_cache_ledger (
  hash_id TEXT PRIMARY KEY, -- MD5 hash of "voiceId_text"
  public_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- C. Create the Storage Bucket (Might need to be run as Superuser or handled in Supabase Dashboard UI manually)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('voice_cache', 'voice_cache', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('child-avatars', 'child-avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Grant access to Storage objects for the avatars
CREATE POLICY "Avatar public read access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'child-avatars');
CREATE POLICY "Avatar public insert access" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'child-avatars');
CREATE POLICY "Avatar public update access" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'child-avatars');

-- ==========================================
-- PHASE 4: Templates, Badges & Streaks
-- ==========================================

CREATE TABLE IF NOT EXISTS plan_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id TEXT NOT NULL,
  name TEXT NOT NULL,
  modules JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,   -- e.g. "first_day", "streak_5", "perfect_week"
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, badge_key)
);

-- Add streak counter to profiles (avoids expensive recalculation)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS lock_mode BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS parent_exit_pin TEXT;

-- Add child slug & master_plan (friendly URL segment & blueprint template)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS child_slug TEXT,
ADD COLUMN IF NOT EXISTS master_plan JSONB;

-- Family slug table (one row per parent account)
CREATE TABLE IF NOT EXISTS parent_settings (
  user_id TEXT PRIMARY KEY,
  family_slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- PHASE 6: Game Reward Scores
-- ==========================================
-- Stores each child's best score per arcade game,
-- allowing family leaderboard comparisons.
-- Security is enforced at the API route level via Clerk auth()
-- (same pattern as all other tables in this project).
-- RLS is ENABLED but a service-role bypass policy is added so the
-- Next.js server routes (which use the service_role key) can read/write freely.
CREATE TABLE IF NOT EXISTS game_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  game_id TEXT NOT NULL,           -- e.g. 'word-runner'
  score INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  won BOOLEAN DEFAULT FALSE,
  difficulty TEXT DEFAULT 'Medium',
  level_time FLOAT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, game_id)      -- one best-score row per child per game
);

-- Enable RLS (required by Supabase best practices)
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

-- Grant full access to the postgres / service_role (used by the Next.js server).
-- The anon / public role is intentionally excluded — all access goes through
-- authenticated server routes where Clerk auth() is verified first.
CREATE POLICY "service_role full access on game_scores"
  ON public.game_scores
  AS PERMISSIVE
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);



