import { useCallback, useRef } from 'react';

// Hook personalizado para debounce de cliques
export const useDebounce = (callback: (...args: unknown[]) => void, delay: number) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Atualizar callback ref
  callbackRef.current = callback;

  return useCallback((...args: unknown[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
};
