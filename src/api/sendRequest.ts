import { createClient } from '@supabase/supabase-js'
import { supabaseAnonKey, supabaseUrl } from './creds';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
