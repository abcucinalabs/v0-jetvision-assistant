/**
 * Supabase Client for Server-Side API Routes
 * Use this in API routes and server-side code
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/types/database'

// Allow build to succeed without env vars (they'll be available at runtime)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'

// Warn if using placeholders (but don't throw in build mode)
if (process.env.NODE_ENV !== 'production' && supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('⚠️  Using placeholder Supabase URL - set NEXT_PUBLIC_SUPABASE_URL for actual functionality')
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
