import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  width: string;
  height: string;
  position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'|'top-center'|'bottom-center';
  children: ReactNode;
}

export default function Popup({ open, onClose, width, height, position, children }: PopupProps) {
  const getPositionClassName = () => {
    switch (position) {
      case 'center':
        return 'flex items-center justify-center';
      case 'top-left':
        return 'items-start justify-start';
      case 'top-right':
        return 'items-start justify-end';
        case 'top-center':
        return 'items-start justify-center';
        case 'bottom-center':
        return 'items-start justify-center';
      case 'bottom-left':
        return 'items-end justify-start';
      case 'bottom-right':
        return 'items-end justify-end';
      default:
        return 'flex items-center justify-center';
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-50 overflow-y-auto ${getPositionClassName()}`}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="bg-white p-4 rounded shadow" style={{ width, height }}>
            {children}
            <button
              className="mt-4 p-2 bg-gray-200 rounded text-gray-700"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}

