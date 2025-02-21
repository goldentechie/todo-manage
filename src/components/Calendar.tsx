import Week from "./Week";

function getAllWeeksOfYear(year: number) {
  let startDate = new Date(year, 0, 1);
  let dayOfWeek = startDate.getDay();

  let firstSunday = new Date(year, 0, 1 - dayOfWeek);

  let weeks = [];
  let currentWeek = [];

  let currentDate = new Date(firstSunday);

  while (currentDate.getFullYear() <= year) { // Ensure we stay within 2025
      currentWeek = [];

      for (let i = 0; i < 7; i++) {
          currentWeek.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
      }

      weeks.push(currentWeek);
  }

  return weeks;
}

function Calendar() {
  const weeks = getAllWeeksOfYear(2025);
  console.log(weeks)
  return (
    <div className="Calendar">
      {weeks.map((week, number)=><Week number={number} week={week}/>)}
    </div>
  );
}

export default Calendar;
