import React, { ReactNode } from 'react';
import {useDraggable} from '@dnd-kit/core';

interface DraggableComponentProps {
  children: ReactNode;
  id: string;
}

export function Draggable(props:DraggableComponentProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,} : undefined;

  const handlePointerDown = (event: React.PointerEvent) => {
    if ((event.target as HTMLElement).classList.contains('ticketContent'))
      listeners?.onPointerDown(event);
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} onPointerDown={handlePointerDown}>
      {props.children}
    </div>
  );
}