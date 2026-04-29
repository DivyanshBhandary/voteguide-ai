import { createClient } from '@supabase/supabase-js'

const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
