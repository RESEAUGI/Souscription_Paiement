import { FC, useEffect, useState } from 'react';
import Alert, { AlertProps } from './Alert';

interface ListProps {
  alerts: AlertProps[];
}

const List: FC<ListProps> = ({ alerts }) => {
  const [alertList, setAlertList] = useState<AlertProps[]>(alerts);

  useEffect(() => {
    setAlertList(alerts);
  }, [alerts]);

  return (
    <div className="relative bg-white border rounded-md shadow-md p-4 z-10">
        <div className="relative top-2 right-2 bg-gray-200 rounded-full px-2 py-1 text-xs">
        {alertList.length} alertes
      </div>
      <div className="space-y-4">
        {alertList.map((alert, index) => (
          <Alert key={index} type={alert.type}>
            {alert.children}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default List;