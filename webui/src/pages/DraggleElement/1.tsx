import React, { useEffect, useState } from 'react';

const DraggableElement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      if (isDragging) {
        const draggableElement = e.target;
        draggableElement.style.left = e.clientX - offsetX + 'px';
        draggableElement.style.top = e.clientY - offsetY + 'px';
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = 'auto';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      // Cleanup: Remove event listeners when component unmounts
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, offsetX, offsetY]);

  const handleMouseDown = (e:any) => {
    setIsDragging(true);
    setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    setOffsetY(e.clientY - e.target.getBoundingClientRect().top);
    e.target.style.cursor = 'grabbing';
  };

  const handleDoubleClick = () => {
    // You can add additional behavior for double-click here
  };

  return (
    <div
      className="draggable"
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: 'lightblue',
        textAlign: 'center',
        lineHeight: '100px',
        position: 'absolute',
        cursor: 'grab',
      }}
    >
      拖拽我
    </div>
  );
};

export default DraggableElement;
