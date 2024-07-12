import React, { useRef, useState } from 'react';

interface ExpandableProps {
  label: string;
  minWidth?: number;
  height?: number;
  children?: React.ReactNode;
}

const Expandable: React.FC<ExpandableProps> = ({
  label,
  minWidth = 300,
  height=100,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        minWidth: `${minWidth}px`,
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px',
          backgroundColor: '#f1f1f1',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={toggleExpansion}
      >
        <span>{label}</span>
        <span>{isExpanded ? '-' : '+'}</span>
      </div>
      {isExpanded && (
        <div
          ref={contentRef}
          style={{
            height: `${height}px`,
            overflow: 'auto',
            padding: '10px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Expandable;
