import React, { useState } from 'react';

const DraggableElement = ({ id, text }:any) => {
  const handleDragStart = (e:any) => {
    e.dataTransfer.setData('text', id);
    e.target.style.cursor = 'grabbing';
  };

  return (
    <div
      id={id}
      draggable="true"
      onDragStart={handleDragStart}
      className="draggable"
    >
      {text}
    </div>
  );
};

const DroppableArea = () => {
  const [droppedItems, setDroppedItems] = useState<any>([]);

  const handleDragOver = (e:any) => {
    e.preventDefault();
  };

  const handleDrop = (e:any) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text');
    console.log("e", e);
    
    setDroppedItems((prevItems:any) => ([...prevItems, itemId]));
    const draggedElement = document.getElementById(itemId);
    if(draggedElement)
    draggedElement.style.cursor = 'grab';
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="droppable"
      style={{width: 500, height:500, border:'1px solid #999'}}
    >
      {droppedItems.map((itemId:any) => (
        <div key={itemId}>{itemId}</div>
      ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <DraggableElement id="item1" text="拖拽我 1" />
      <DraggableElement id="item2" text="拖拽我 2" />
      <DroppableArea />
    </div>
  );
}

export default App;
