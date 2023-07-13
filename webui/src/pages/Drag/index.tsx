import React, { useState } from 'react';
import DragLine from '../../components/DragBox';
import './style.less';
const maxWidth = 300;
const minWidth = 100;
const App: React.FC = () => {
  const [width, setWidth] = useState(200);


  const handleWidthChange = (offsetx: number,x:any) => {
    const current = offsetx + width;
    const newWidth = current > maxWidth ? maxWidth : current < minWidth ? minWidth : current;
    setWidth(newWidth);
  };

  return (
    <div className='DragWrapperRoot'>
      <div style={{width}} className='dragBox'> 
        Drag this line to resize the div.
      </div>
      <DragLine onChange={handleWidthChange} className="width-drag" style={{left: width}}/>
    </div>
  );
};

export default App;
