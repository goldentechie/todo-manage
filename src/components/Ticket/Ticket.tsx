import { useState } from "react";
import { FaPen, FaSave, FaTrash } from "react-icons/fa";
import { deleteTodo, moveToEditStatus, Todo, todoDone, todoScheduled, updateTodoContent } from "../../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Draggable } from "../../features/dnd/Draggable";
import './Ticket.css';

type TicketComponentProps = {
  data: Todo,
}

function Ticket({data}: TicketComponentProps) {
  const [showControls, setShowControls] = useState(false);
  const [content,SetContent] = useState(data.content);
  const isEdit = useSelector((state:RootState)=>state.calendar.TodoIdInEdit === data.id);
  const dispatch = useDispatch();

  const Edit = () => {
    dispatch(moveToEditStatus(data.id));
  }
  const Save = () => {
    dispatch(updateTodoContent({ updateTodoId: data.id, newTodoContent: content}));
  }
  const Delete = () => {
    dispatch(deleteTodo(data.id));
  }
  const OnPressEnterToSave = (event: React.KeyboardEvent)=>{
    if (event.key === 'Enter') {
      Save();
    }
  }
  const Done = (isDone: boolean) => {
    dispatch(todoDone({todoDoneId: data.id, isDone}))
  }
  const Schedule = (isScheduled: boolean) => {
    dispatch(todoScheduled({todoScheduledId: data.id, isScheduled}))
  }
  return (
    <Draggable id={data.id} poolId={data.poolId} poolType={data.poolType} poolDate={data.date}>
      <div className="Ticket" onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
        <span><input className="doneCheckbox" type="checkbox" checked={data.isDone} onChange={e=>Done(e.target.checked)}/></span>
        <span><input className={"scheduledCheckbox"+(data.isDone?" hidden":"")} type="checkbox" checked={data.isScheduled} onChange={e=>Schedule(e.target.checked)}/></span>
        <div className={"ticketContent"+(data.isDone?" strike":"")}>
          {isEdit?
            <input 
              onKeyDown={OnPressEnterToSave} 
              value={content} 
              autoFocus 
              onChange={e=>SetContent(e.target.value)}
              onBlur={e=>Save()}/>:
            data.content}
        </div>
        <div className={"ticketControlButtons"+((showControls||isEdit)?"":" hidden")}>
          {isEdit ?
            <button onClick={Save}><FaSave /></button>:
            <button onClick={Edit}><FaPen /></button>}
          <button onClick={Delete}><FaTrash /></button>
        </div>
      </div>
    </Draggable>
  );
}

export default Ticket;
