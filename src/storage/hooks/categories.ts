import { usePromise } from '../../kit/hooks';
import { useEffect, useLayoutEffect } from 'react';
import { getCategories } from '../methods/categories';
import { notifier } from '../../services/notifier';

export const useCategories = (live = true) => {
  const { isLoading, data, send, sendSilent } = usePromise(getCategories);

  useLayoutEffect(() => {
    send();
  }, []);

  useEffect(() => {
    if (!live) {
      return;
    }

    const listener = () => {
      sendSilent();
    };

    notifier.subscribe('categories-update', listener);

    return () => {
      notifier.unsubscribe('categories-update', listener);
    };
  }, [live]);

  return { isLoading, data };
};
