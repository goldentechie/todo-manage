import { useState } from "react";
import { FaPen, FaSave, FaTrash } from "react-icons/fa";
import { deleteTodo, moveToEditStatus, Todo, updateTodoContent } from "../../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Draggable } from "../../features/dnd/Draggable";
import './Ticket.css';

type TicketComponentProps = {
  data: Todo,
}

function Ticket({data}: TicketComponentProps) {
  const [showControls, setShowControls] = useState(false);
  const [isDone,Done] = useState(data.isDone);
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
  return (
    <Draggable id={data.id}>
      <div className="Ticket" onMouseEnter={()=>setShowControls(true)} onMouseLeave={()=>setShowControls(false)}>
        <span><input type="checkbox" onChange={e=>Done(e.target.checked)}/></span>
        <div className={"ticketContent"+(isDone?" strike":"")}>
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
