import React, { useEffect, useRef, useState } from 'react';

interface DraggableProps {
  initialX: number;
  initialY: number;
  children?: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({
  initialX,
  initialY,
  children,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setOffset({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
        setIsDragging(true);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && containerRef.current) {
        setPosition({
          x: event.clientX - offset.x,
          y: event.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex:32
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
