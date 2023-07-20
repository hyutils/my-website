import React, { useCallback, useEffect, useRef, useState } from "react";

const visibleHeight = 360;
const itemHeight = 50;
const visibleCount = Math.ceil(visibleHeight / itemHeight) + 2;
const totalCount = 100;

const source = Array.from(Array(totalCount), (item, index) => index);

export default function VirtualList() {
  const [list, setList] = useState(source);
  const listRef = useRef<any>();

  const scrollEvent = useCallback((e:any) => {
    const startIdx = Math.floor(e.target.scrollTop / itemHeight);
    const endIdx = startIdx + visibleCount;
    setList(source.slice(startIdx, endIdx));
    const offset = startIdx * itemHeight;
    if(listRef.current){
      listRef.current.style.top = offset + "px";
    }
  }, []);
 
  return (
    <div
      style={{
        backgroundColor: "#FFF",
        height: visibleHeight + 'px',
        textAlign: "center",
        overflow: "auto",
        position: "relative",
        overscrollBehavior: 'contain'
      }}
      onScroll={scrollEvent}
    >
      <div style={{ height: totalCount * itemHeight + 'px' }}></div>
      <div
        className="list"
        ref={listRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: visibleHeight + 'px'
        }}
      >
        {list.map((item) => {
          return (
            <div
              key={item}
              style={{ height: itemHeight + 'px', borderBottom: "1px solid #eee" }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}