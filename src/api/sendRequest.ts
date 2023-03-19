import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseUrl } from './creds';

// TODO: think of better architecture

const localStorageKey = '_API_ANON_KEY';

let keyUpdated = false;

export const getSupabaseKey = () => {
  const key = localStorage.getItem(localStorageKey);
  return key;
};

export const updateSupabaseKey = (key: string) => {
  localStorage.setItem(localStorageKey, key);
  keyUpdated = true;
};

let instance: SupabaseClient | undefined;

export const supabase = () => {
  if (keyUpdated || !instance) {
    const key = getSupabaseKey();
    if (!key) {
      throw new Error('no key is provided!');
    }
    instance = createClient(supabaseUrl, key ?? '');
    keyUpdated = false;
  }

  return instance;
};
