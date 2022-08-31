import { supabase } from '../sendRequest';

export const getUser = () => {
  return supabase.auth.user();
};

export const getSession = () => {
  return supabase.auth.session();
};

export const singIn = async (email: string, password: string) => {
  try {
    const result = await supabase.auth.signIn({
      email,
      password,
    });

    if (result.error) {
      throw result.error.message;
    }

    return result;
  } catch (e) {
    throw e;
  }
};
