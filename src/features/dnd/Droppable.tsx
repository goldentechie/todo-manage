import { useDroppable } from "@dnd-kit/core";

interface DroppableComponentProps {
  children: React.ReactNode;
  id: string,
  classNames: string;
  data: Record<string, any>;
}
export function Droppable({ children, id, classNames, data }: DroppableComponentProps) {
  // droppable
  const { isOver, setNodeRef } = useDroppable({id, data});

  const style = {backgroundColor: isOver ? "#dcb8ff" : undefined};
  return (
    <div ref={setNodeRef} style={style} className={classNames}>
      {children}
    </div>
  );
}
