import { useDispatch, useSelector } from "react-redux";
import Ticket from "../Ticket/Ticket";
import { createTodo } from "../../features/todos/todoSlice";
import { RootState } from "../../app/store";
import { isSameDay, isToday, isWeekend } from "../../utils";
import { useState } from "react";
import './Day.css';
import { Droppable } from "../../features/dnd/Droppable";
import Pool from "../Pool/Pool";

type DayComponentProps = {
  date: Date;
};

function Day({ date }: DayComponentProps) {
  let className ="Day" + (date.getMonth() % 2 === 1 ? " oddColor" : " evenColor");
  if (isWeekend(date)) className += " weekend";
  if (isToday(date)) className += " activeDay";

  return (
    <Pool classNames={className} id={date.toDateString()}/>
  );
}

export default Day;
