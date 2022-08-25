import { useRequest } from '../../../hooks/useRequest';
import { getLanguages } from '../../methods/languages';

export const useLanguages = () => useRequest(getLanguages);
