// components/Alert.tsx
import React, { ReactNode } from 'react';

export interface AlertProps {
  type: 'success' | 'error' | 'info'|'warning';
  children: ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  let alertStyles = '';
  switch (type) {
    case 'success':
      alertStyles =
        'bg-green-100 text-green-800 border-green-400 dark:bg-green-200 dark:text-green-900';
      break;
    case 'error':
      alertStyles =
        'bg-red-100 text-red-800 border-red-400 dark:bg-red-200 dark:text-red-900';
      break;
    case 'info':
      alertStyles =
        'bg-blue-100 text-blue-800 border-blue-400 dark:bg-blue-200 dark:text-blue-900';
      break;
      case 'warning':
      alertStyles =
        'bg-yellow-100 text-yellow-800 border-yellow-400 dark:bg-yellow-200 dark:text-yellow-900';
      break;
  }

  return (
    <div
      className={`p-4 mb-4 border-l-4 ${alertStyles} rounded-md shadow-md`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Alert;