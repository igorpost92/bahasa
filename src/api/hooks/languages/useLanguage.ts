import { useRequest } from '../../../hooks/useRequest';
import { getLanguage } from '../../methods/languages';

export const useLanguage = (id?: string) => useRequest(
  async () => {
    if (!id) {
      return null;
    }
    return getLanguage(id);
  },
);
