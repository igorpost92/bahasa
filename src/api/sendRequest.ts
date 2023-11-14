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

    const [id, innerKey] = key.split('$');
    if (!innerKey) {
      throw new Error('wrong key is provided!');
    }

    const url = supabaseUrl[id];
    if (!url) {
      throw new Error('wrong key is provided!');
    }

    instance = createClient(url, innerKey ?? '');
    keyUpdated = false;
  }

  return instance;
};
