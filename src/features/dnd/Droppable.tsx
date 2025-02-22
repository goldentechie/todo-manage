import { useDroppable } from "@dnd-kit/core";

interface DroppableComponentProps {
  children: React.ReactNode;
  id: string,
  classNames: string;
}
export function Droppable({ children, id, classNames }: DroppableComponentProps) {
  // droppable
  const { isOver, setNodeRef } = useDroppable({id});

  const style = {backgroundColor: isOver ? "#dcb8ff" : undefined};
  return (
    <div ref={setNodeRef} style={style} className={classNames}>
      {children}
    </div>
  );
}
