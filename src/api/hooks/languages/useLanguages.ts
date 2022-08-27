import { usePromiseOnMount } from '../../../hooks/usePromiseOnMount';
import { getLanguages } from '../../methods/languages';

export const useLanguages = () => usePromiseOnMount(getLanguages);
