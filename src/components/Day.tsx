import { useDispatch, useSelector } from "react-redux";
import Ticket from "./Ticket";
import { createTodo } from "../features/todos/todoSlice";
import { RootState } from "../app/store";

const isWeekend = (date: Date) => {return date.getDay() === 0 || date.getDay() === 6;}
const isToday = (date: Date) => {
  const today = new Date();

  return date.getDate() === today.getDate() 
      && date.getMonth() === today.getMonth() 
      && date.getFullYear() === today.getFullYear();
}
const isSameDay = (date1: Date, date2: Date) =>{
  if (date1.getFullYear() !== date2.getFullYear()) return false;
  if (date1.getMonth() !== date2.getMonth()) return false;
  if (date1.getDate() !== date2.getDate()) return false;
  return true;
}

type DayComponentProps = {
  date: Date
}

function Day({date} : DayComponentProps) {
  let className = 'Day'+(date.getMonth()%2===1?' oddColor':' evenColor');
  if (isWeekend(date)) className += ' weekend';
  if (isToday(date)) className += ' activeDay';

  const dispatch = useDispatch();

  const todos = useSelector((state: RootState)=>{
    return state.calendar.todos.filter(todo=>isSameDay(new Date(todo.date), date));
  });

  const newTodo = ()=>{
    dispatch(createTodo({
      date: date,
      content: "new todo",
      isDone: false,
    }))
  }
  return (
    <div className={className}>
      <div>{date.getMonth()+1+'/'+date.getDate()}</div>
      {todos.map(todo=><Ticket data={todo} />)}
      <div><button className="newTodoButtonOnDay" onClick={newTodo}>+ New Todo</button></div>
    </div>
  );
}

export default Day;
