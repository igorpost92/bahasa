import { createClient } from '@supabase/supabase-js';
import { supabaseUrl } from '../src/api/creds';
import { privateKey } from './privateCreds';

export const privateSupabase = createClient(supabaseUrl, privateKey);
