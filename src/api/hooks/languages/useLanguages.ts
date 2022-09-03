import { usePromiseOnMount } from '../../../kit/hooks';
import { getLanguages } from '../../methods/languages';

export const useLanguages = () => usePromiseOnMount(getLanguages);
