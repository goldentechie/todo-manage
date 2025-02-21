import { useDispatch, useSelector } from "react-redux";
import Ticket from "../Ticket/Ticket";
import { createTodo } from "../../features/todos/todoSlice";
import { RootState } from "../../app/store";
import { isSameDay, isToday, isWeekend } from "../../utils";
import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import './Day.css';

type DayComponentProps = {
  date: Date;
};

function Day({ date }: DayComponentProps) {
  // droppable
  const { isOver, setNodeRef } = useDroppable({id: date.toDateString(),});
  const style = {backgroundColor: isOver ? "#dcb8ff" : undefined,};

  let className ="Day" + (date.getMonth() % 2 === 1 ? " oddColor" : " evenColor");
  if (isWeekend(date)) className += " weekend";
  if (isToday(date)) className += " activeDay";
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.calendar.todos.filter((todo) => isSameDay(new Date(todo.date), date)));
  // const newTodo = () =>;
  const [newTodoContent, setNewTodoContent] = useState("");
  const [isInputActive, SetInputActive] = useState(false);
  const activateInput = () => {SetInputActive(true);setNewTodoContent("")};
  const disableInput = () => SetInputActive(false);

  const handleESCAndEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') disableInput();
    if (event.key === 'Enter') {
      if (newTodoContent.trim().length > 0) dispatch(createTodo({date: date.toISOString(),content: newTodoContent.trim(),isDone: false,}))
      else disableInput();
    }
    setNewTodoContent("");
  }
  return (
    <div ref={setNodeRef} style={style} className={className}>
      <div>{date.getMonth() + 1 + "/" + date.getDate()}</div>
      <div className="tickets">
        {todos.map((todo) => (<Ticket data={todo} />))}
      </div>
      <div>
        {isInputActive?
          <input type="text" autoFocus onBlur={disableInput} onKeyDown={handleESCAndEnter} value={newTodoContent} onChange={e=>setNewTodoContent(e.target.value)}/>:
          <div className="newTodoButton" onClick={activateInput}>+ Add new To Do</div>}
      </div>
    </div>
  );
}

export default Day;
