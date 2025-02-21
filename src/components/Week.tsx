import Day from "./Day";

interface WeekComponentProps {
  number: number;
  week: Date[];
}

function Week({number, week}:WeekComponentProps) {
  return (
    <div className="Week">
      <div className="weekNumber">Week {number+1}</div>
      {week.map(date=><Day date={date}/>)}
    </div>
  );
}

export default Week;
