import { ModalProps, ModalSizeProps } from '@/@types/components';
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components';

const Modal: React.FC<ModalProps> = ({
  open = false,
  title = '',
  isHeaderEnable = true,
  isFooterEnable = true,
  positiveBtnText = 'Submit',
  negativeBtnText = 'Cancel',
  onCancel,
  onSubmit,
  children,
  scrollBehavior = 'viewport',
  size = 'md',
}) => {
  if (!open) return null;

  const sizeClasses: Record<ModalSizeProps, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    'screen-sm': 'max-w-screen-sm',
    'screen-md': 'max-w-screen-md',
    'screen-lg': 'max-w-screen-lg',
    'screen-xl': 'max-w-screen-xl',
    'screen-2xl': 'max-w-screen-2xl',
  };
  const containerClasses = `fixed inset-0 z-50 flex items-center justify-center bg-[var(--dim-color)] ${
    scrollBehavior === 'viewport' ? 'overflow-y-auto' : 'overflow-hidden'
  }`;

  const modalClasses = `bg-white rounded-lg shadow-xl w-full ${
    sizeClasses[size]
  } m-4 flex flex-col ${
    scrollBehavior === 'body' ? 'max-h-[calc(100%-56px)]' : ''
  }`;

  const contentClasses = `px-6 py-4 ${
    scrollBehavior === 'body' ? 'overflow-y-auto max-h-[500px]' : ''
  }`;

  return (
    <div className={containerClasses}>
      <div className={modalClasses}>
        {isHeaderEnable && title && (
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={() => {
                if (onCancel) onCancel(true);
              }}
              className="text-gray-500 cursor-pointer hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className={contentClasses}>{children}</div>

        {isFooterEnable && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button
                title={negativeBtnText}
                variant="outline"
                onPress={() => {
                  if (onCancel) onCancel(false);
                }}
                isOutlineEffect={true}
                className="px-4 py-2 rounded !w-24"
              />
              <Button
                title={positiveBtnText}
                variant="solid"
                onPress={onSubmit}
                isSolidEffect={true}
                className="px-4 py-2 rounded !w-24"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
