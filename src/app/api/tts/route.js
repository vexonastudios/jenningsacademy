import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";
import crypto from 'crypto';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const voiceId = searchParams.get('voiceId');
  const text = searchParams.get('text') || "Hi, I am ready to be your guide!";

  if (!voiceId) {
    return NextResponse.json({ error: 'Voice ID is required' }, { status: 400 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Server missing ElevenLabs credentials' }, { status: 500 });
  }

  // 1. Generate unique cache hash
  const hashId = crypto.createHash('md5').update(`${voiceId}_${text}`).digest('hex');

  try {
    // 2. Check the Database Ledger (Blazing fast indexed check)
    const { data: cacheHit } = await supabase
       .from('voice_cache_ledger')
       .select('public_url')
       .eq('hash_id', hashId)
       .single();

    if (cacheHit && cacheHit.public_url) {
       // Instantly serve from edge storage cache! 0 API Credits used.
       return NextResponse.redirect(cacheHit.public_url);
    }

    // 3. Cache Miss: Generate via ElevenLabs (Burn 1 Credit)
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.5, similarity_boost: 0.5 }
      })
    });

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);

    const audioBuffer = await response.arrayBuffer();

    // 4. Upload to Supabase Storage Bucket
    const fileName = `${hashId}.mp3`;
    const { error: uploadError } = await supabase.storage
       .from('voice_cache')
       .upload(fileName, audioBuffer, { contentType: 'audio/mpeg' });

    if (!uploadError) {
       // 5. Register in Ledger to skip future API calls
       const { data } = supabase.storage.from('voice_cache').getPublicUrl(fileName);
       await supabase.from('voice_cache_ledger').insert([{ 
           hash_id: hashId, 
           public_url: data.publicUrl 
       }]);
    }

    // 6. Send the generated buffer to the current user immediately
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error("TTS Pipeline Error:", error);
    return NextResponse.json({ error: 'Failed to stream audio' }, { status: 500 });
  }
}
