import { usePromise } from '../../kit';
import { getVerbs } from '../methods/verbs';
import { useEffect, useLayoutEffect } from 'react';
import { notifier } from '../../services/notifier';

export const useVerbsTenses = (live = true) => {
  // TODO: sort?
  const { isLoading, data, send, sendSilent } = usePromise(getVerbs);

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

    notifier.subscribe('verbs-update', listener);

    return () => {
      notifier.unsubscribe('verbs-update', listener);
    };
  }, [live]);

  return { isLoading, data };
};
