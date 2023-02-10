import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface Modal<T extends string = string, P = any> {
  isOpen: boolean;
  type: T;
  payload: P;
}

interface ModalContextProps {
  modals: Modal[];
  setModals: (modals: Modal[] | ((modals: Modal[]) => Modal[])) => void;
}

const defaultValue = {
  modals: [],
  setModals: () => undefined,
};

const ModalContext = createContext<ModalContextProps>(defaultValue);

interface Props {
  children: ReactNode;
}

export const ModalContextLayer = (props: Props) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const state = useMemo(
    () => ({
      modals,
      setModals,
    }),
    [modals],
  );

  return <ModalContext.Provider value={state}>{props.children}</ModalContext.Provider>;
};

export const useModalAbstract = <T extends string, P>(type: T) => {
  const { modals, setModals } = useContext(ModalContext);

  const modal = modals.find(item => item.type === type);

  const open = useCallback(
    // TODO: optional payload
    (payload: P) => {
      setModals(prev => {
        // TODO: if already opened

        return prev.concat({ type, isOpen: true, payload });
      });
    },
    [setModals],
  );

  const close = useCallback(() => {
    setModals(prev => {
      return prev.filter(modal => modal.type !== type);
    });
  }, [setModals]);

  return {
    isOpen: modal?.isOpen ?? false,
    payload: modal?.payload as P | undefined,
    open,
    close,
  };
};
