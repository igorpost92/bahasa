import { useModalAbstract } from '../kit/contexts/ModalContext';

export enum Modals {
  Word = 'Word',
  Category = 'Category',
}

interface ModalsPayloads {
  [Modals.Word]: { id?: string };
  [Modals.Category]: { id?: string };
}

export const useModal = <T extends Modals>(type: T) => {
  const modal = useModalAbstract<T, ModalsPayloads[T]>(type);
  return modal;
};
