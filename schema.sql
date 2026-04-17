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
