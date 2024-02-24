import { toast } from '@/components/ui/toast';
import React from 'react';
import { useSelector } from 'react-redux';

export function useAsyncSelector(selector, initiator) {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const store = useSelector(selector);

  React.useEffect(() => {
    (async () => {
      if (!isInitialized) {
        try {
          await initiator?.();
          setIsInitialized(true);
        } catch (error) {
          toast.error(error.messaage);
        }
      }
    })();
  }, [initiator, isInitialized]);

  return [store, isInitialized];
}
