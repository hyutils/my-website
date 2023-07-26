/**
 * 拖拽拉伸线条,Y方向
 */
 import React, { useRef } from 'react';

 export interface DragLineProps {
   className?: string;
   style?: React.CSSProperties;
   onStart?: () => void;
   onEnd?: (y: number) => void;
   /**
    * 位置发生变化的回调
    * y 是相对于定位父元素的偏移量
    */
   onChange?: (y: number) => void;
 }
 
 const DragLine = (props: DragLineProps) => {
   const { className, style, onChange, onStart, onEnd } = props;
   const startY = useRef(0);
   const currentY = useRef(0);
 
   const onDragStart = (e: React.MouseEvent) => {
     e.stopPropagation();
     e.preventDefault();
     onStart?.();
     document.addEventListener('mousemove', onDragging);
     document.addEventListener('mouseup', onDragEnd);
     startY.current = e.pageY;
   };
 
   const onDragging = (e: MouseEvent) => {
     e.stopPropagation();
     e.preventDefault();
     const offsetY = startY.current - e.pageY;
     currentY.current = offsetY;
     onChange?.(offsetY);
   };
 
   const onDragEnd = (e: MouseEvent) => {
     document.removeEventListener('mousemove', onDragging);
     document.removeEventListener('mouseup', onDragEnd);
     onEnd?.(currentY.current);
     startY.current = 0;
   };
 
   return <div className={className} style={style} onMouseDown={onDragStart} />;
 };
 
 export default DragLine;
 