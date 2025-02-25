import { isToday, isWeekend } from "../../utils";
import './Day.css';
import Pool from "../Pool/Pool";

type DayComponentProps = {
  date: Date;
};

function Day({ date }: DayComponentProps) {
  let className ="Day" + (date.getMonth() % 2 === 1 ? " oddColor" : " evenColor");
  if (isWeekend(date)) className += " weekend";
  if (isToday(date)) className += " activeDay";

  return (
    <Pool classNames={className} id={date.toDateString()} type="day" date={date}/>
  );
}

export default Day;
