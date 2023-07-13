import React, { useRef, useState, useEffect } from 'react';
interface DragLineProps {
  style?: any;
  className?: string;
  onChange: (width: number, height:number) => void;
}

const DragLine: React.FC<DragLineProps> = (props) => {
  const {style, className, onChange } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const initialMouseX = useRef(0); // 初始x值
  const initialMouseY = useRef(0); // 初始Y值

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && containerRef.current) {
        const deltaX = event.clientX - initialMouseX?.current;
        const deltaY = event.clientY - initialMouseY?.current;

        onChange(deltaX, deltaY)
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, initialMouseX, initialMouseY, onChange]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
     initialMouseX.current = event.clientX;
     initialMouseY.current =  event.clientY;
  };


  return (
    <div
      ref={containerRef}
      className={className} 
      style={style}
      onMouseDown={handleMouseDown}
    />
  );
 
};

export default DragLine;
