"use client"
import { AlertProps } from '@/components/usefull/Alert';
import List from '@/components/usefull/AlertList';
import Dragable from '@/components/usefull/Dragable';
import React, { useState } from 'react';
const App: React.FC = () => {
  const initialAlerts: AlertProps[] = [
    { type: 'success', children: 'This is a success alert' },
    { type: 'error', children: 'This is an error alert' },
    { type: 'info', children: 'This is an info alert' },
    { type: 'warning', children: 'This is a warning alert' },

  ];

  const [alerts, setAlerts] = useState<AlertProps[]>(initialAlerts);
  const [isExpanded, setIsExpanded] = useState(false);

  const addAlert = () => {
    setAlerts([
      ...alerts,
      { type: 'info', children: 'This is a new info alert' },
    ]);
  };
  const toogleNotification = () => {
    setIsExpanded(!isExpanded)
  };

  return (
    <div className="container mx-auto py-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={addAlert}
      >
        Add Alert
      </button>
      {/* <div><List alerts={alerts} /></div>
      <div><Alert type='info'>just to inform</Alert></div>
      <div><Alert type='error'>an error occured</Alert></div>
      <div><Alert type='success'>successfully done</Alert></div> */}
      <div>
      
    </div>
    <Dragable initialX={100} initialY={100}  >
    
    <div >
    <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={toogleNotification}
      ><div className="absolute top-2 left-10 bg-gray-200 rounded-full px-2 py-1 text-xs">
      {alerts.length}
    </div>
        <i className="las la-envelope text-xl mx-2"></i>

      </button>
        {/* {isExpanded&&*/(  
          <div
          className={`h-[400px] overflow-auto bg-gray-200 p-4 rounded shadow transition-all duration-300 ${
            isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
            <List  alerts={alerts} />

          </div>
           )  } 
        
    </div>
      </Dragable>
    

    </div>
  );
};

export default App;