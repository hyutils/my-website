import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  SORTABLE_ITEM: "sortableItem",
};

interface SortableItemProps {
  text: string;
  index: number;
  moveItem: (fromIndex: number, toIndex: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  text,
  index,
  moveItem,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SORTABLE_ITEM,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.SORTABLE_ITEM,
    hover: (item: any) => {
      if (item.index !== index) {
        
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ padding: "8px", border: "1px solid #ccc", opacity }}
    >
      {text}
    </div>
  );
};

const defaultdata = [
  { id: 1, text: "第一项" },
  { id: 2, text: "第二项" },
  { id: 3, text: "第三项" },

];

interface SortableListProps {
  items?: { id: number; text: string }[];
}

const SortableList: React.FC<SortableListProps> = ({ items = defaultdata }) => {
  const [data, setData] = useState(items);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedData = [...data];
    const [removedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, removedItem);
    setData(updatedData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {data.map((item, index) => (
        <SortableItem
          key={item.id}
          index={index}
          text={item.text}
          moveItem={(f: number, to: number) => moveItem(f, to)}
        />
      ))}
    </DndProvider>
  );
};

export default SortableList;
