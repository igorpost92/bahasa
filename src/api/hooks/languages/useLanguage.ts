import { usePromiseOnMount } from '../../../hooks/usePromiseOnMount';
import { getLanguage } from '../../methods/languages';

export const useLanguage = (id?: string) =>
  usePromiseOnMount(async () => {
    if (!id) {
      return null;
    }
    return getLanguage(id);
  });
