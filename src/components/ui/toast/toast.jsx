import React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils';
import { IconAlertCircle, IconInfoCircle, IconX } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { toast } from './toast-handler';

function ToastItem({ message, type, onClose }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current?.classList.add('animate-in', 'slide-in-from-right');

    // Put the out animation 250ms earlier than the time when the
    // toast data is deleted, this ensures the deletion is animated.
    setTimeout(() => {
      ref.current?.classList.add('animate-out', 'slide-out-to-right');
    }, 2750);
  }, []);

  function handleOnClose() {
    ref.current?.classList.add('animate-out', 'slide-out-to-right');

    setTimeout(onClose, 280);
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn('flex overflow-clip rounded-md shadow duration-300', {
        'bg-gray-50 text-gray-900': type === 'info',
        'bg-red-100 text-red-400 shadow-red-50': type === 'error',
      })}
    >
      <div className="relative flex w-80 grow items-center gap-2 p-4">
        <div className="min-w-6">
          {type === 'error' ? <IconAlertCircle /> : <IconInfoCircle />}
        </div>

        <p className="line-clamp-2 text-sm">{message}</p>
      </div>

      <button
        type="button"
        aria-label="close-toast"
        onClick={handleOnClose}
        className={clsx(
          'flex w-10 cursor-pointer content-center items-center  justify-center transition duration-200',
          {
            'bg-red-200 text-red-400 hover:bg-red-300 hover:text-red-500':
              type === 'error',
            'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500':
              type === 'info',
          },
        )}
      >
        <IconX size={20} />
      </button>
    </div>
  );
}

ToastItem.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'error']).isRequired,
};

function ToastsDisplayer() {
  const MAX_TOASTS_AMOUNT = 4;
  const [toasts, setToasts] = React.useState([]);

  React.useEffect(() => {
    const handleToastSubscribe = (toastId, message, type) => {
      const newToast = { id: toastId, message, type };

      setToasts((current) => {
        // Remove the first item and push the new toast into the last index
        // when the amount of existing toasts equals the max amount, else
        // just push it  without any other operation.
        const newToastsEntry =
          current.length === MAX_TOASTS_AMOUNT
            ? [...current.slice(1, current.length), newToast]
            : [...current, newToast];

        return newToastsEntry;
      });

      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((currentToast) => currentToast.id !== toastId),
        );
      }, 3000);
    };

    toast.subscribe(handleToastSubscribe);

    return () => toast.unsubscribe(handleToastSubscribe);
  }, []);

  function removeToast(id) {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== id),
    );
  }

  return createPortal(
    toasts.length > 0 ? (
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((data) => (
          <ToastItem
            key={data.id}
            message={data.message}
            type={data.type}
            onClose={() => removeToast(data.id)}
          />
        ))}
      </div>
    ) : null,
    document.querySelector('body'),
  );
}

export { ToastsDisplayer as Toast };
