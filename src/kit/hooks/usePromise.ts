import { useRef, useState } from 'react';

type PromiseResult<T extends Promise<any>> = T extends Promise<infer R> ? R : any;

// TODO: initial as true
export const usePromise = <
  T extends (...args: any[]) => Promise<any>,
  R = PromiseResult<ReturnType<T>>,
>(
  fn: T,
  initialLoading = false,
) => {
  const [isLoading, setLoading] = useState(initialLoading);

  const [data, setData] = useState<R | null>(null);
  // const [data, setData] = useState<PromiseResult<ReturnType<T>> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callIdRef = useRef(0);

  // export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  //   let timeout
  //
  //   return (...args: Parameters<F>): Promise<ReturnType<F>> =>
  //     new Promise(resolve => {
  //       if (timeout) {
  //         clearTimeout(timeout)
  //       }
  //
  //       timeout = setTimeout(() => resolve(func(...args)), waitFor)
  //     })
  // }

  const send = async (...args: Parameters<T>) => {
    const currentId = ++callIdRef.current;

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const result = await fn(...args);
      if (currentId !== callIdRef.current) {
        return;
      }

      setData(result);
    } catch (e) {
      if (currentId !== callIdRef.current) {
        return;
      }

      setError((e as Error)?.message ?? 'Unknown error');
    }

    setLoading(false);
  };

  return { isLoading, data, error, send };
};
