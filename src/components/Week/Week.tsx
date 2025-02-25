import { getDateWeek, isThisWeek } from "../../utils";
import Day from "../Day/Day";
import Pool from "../Pool/Pool";
import './Week.css';

interface WeekComponentProps {
  week: Date[];
}

function Week({week}:WeekComponentProps) {
  const id = week[6].getFullYear() + " W"+ getDateWeek(week[6]);
  return (
    <div className={"Week"+(isThisWeek(week)?" activeWeek":"")}>
      {week.map(date=><Day date={date}/>)}
      <Pool classNames="" id={id} type="week" date={week[6]}/>
    </div>
  );
}

export default Week;
