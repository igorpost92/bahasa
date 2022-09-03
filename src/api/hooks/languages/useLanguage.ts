import { usePromiseOnMount } from '../../../kit/hooks';
import { getLanguage } from '../../methods/languages';

export const useLanguage = (id?: string) =>
  usePromiseOnMount(async () => {
    if (!id) {
      return null;
    }
    return getLanguage(id);
  });
