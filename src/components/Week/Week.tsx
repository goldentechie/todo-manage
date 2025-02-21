import { isThisWeek } from "../../utils";
import Day from "../Day/Day";
import './Week.css';

interface WeekComponentProps {
  week: Date[];
}

function Week({week}:WeekComponentProps) {
  return (
    <div className={"Week"+(isThisWeek(week)?" activeWeek":"")}>
      {week.map(date=><Day date={date}/>)}
    </div>
  );
}

export default Week;
