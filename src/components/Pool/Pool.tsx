import { Droppable } from "../../features/dnd/Droppable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Ticket from "../Ticket/Ticket";
import { useState } from "react";
import { createTodo, PoolType } from "../../features/todos/todoSlice";

interface PoolComponentProps {
  classNames: string;
  id: string;
  type: PoolType;
  date: Date;
}

function Pool({classNames, id, type, date} : PoolComponentProps) {
  // droppable
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.calendar.todos.filter((todo) => todo.poolType === "day" && isSameDay(new Date(todo.date), date)));
  const [newTodoContent, setNewTodoContent] = useState("");
  const [isInputActive, SetInputActive] = useState(false);
  const activateInput = () => {SetInputActive(true);setNewTodoContent("")};
  const disableInput = () => SetInputActive(false);
  let title = "Unassigned";
  switch (type) {
    case "day": title = date.getMonth() + 1 + "/" + date.getDate(); break;
    case "month":title = (new Date(id)).getMonth() break;
    case "week":
    break;
  }

  const handleESCAndEnter = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape'){ disableInput(); setNewTodoContent(""); }
    if (event.key === 'Enter') {
      if (newTodoContent.trim().length > 0) dispatch(createTodo({content: newTodoContent.trim(),isDone: false, poolId:id, poolType: "day"}))
      else disableInput();
      setNewTodoContent("");
    }
  }
  return (
    <Droppable id={id} classNames={classNames}>
      <div>{title}</div>
      <div className="tickets">
        {todos.map((todo) => (<Ticket data={todo} />))}
      </div>
      <div>
        {isInputActive?
          <input type="text" autoFocus onBlur={disableInput} onKeyDown={handleESCAndEnter} value={newTodoContent} onChange={e=>setNewTodoContent(e.target.value)}/>:
          <div className="newTodoButton" onClick={activateInput}>+ Add new To Do</div>}
      </div>
    </Droppable>
  );
}

export default Pool;
