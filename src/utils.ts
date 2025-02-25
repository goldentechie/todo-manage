export function getViewWeeksOfYear(year:number, weeksToShow:number, startWeek:number) {
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
      if (startWeek > 0)
        startWeek --;
      else {
        if (weeksToShow > 0)
        {
          weeks.push(currentWeek);
          weeksToShow --;
        }
        else break;
      }
  }
  return weeks;
}


export const isWeekend = (date: Date) => {
  return date.getDay() === 0 || date.getDay() === 6;
};
export const isToday = (date: Date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
export const isSameDay = (date1: Date, date2: Date) => {
  if (date1.getFullYear() !== date2.getFullYear()) return false;
  if (date1.getMonth() !== date2.getMonth()) return false;
  if (date1.getDate() !== date2.getDate()) return false;
  return true;
};

const getDateWeek = (date:Date)=>{
  const currentDate = 
      (typeof date === 'object') ? date : new Date();
  const januaryFirst = 
      new Date(currentDate.getFullYear(), 0, 1);
  const daysToNextMonday = 
      (januaryFirst.getDay() === 1) ? 0 : 
      (7 - januaryFirst.getDay()) % 7;
  const nextMonday = 
      new Date(currentDate.getFullYear(), 0, 
      januaryFirst.getDate() + daysToNextMonday);

  return (currentDate < nextMonday) ? 52 : 
  (currentDate > nextMonday ? Math.ceil(
  (currentDate.getTime() - nextMonday.getTime()) / (24 * 3600 * 1000) / 7) : 1);
}

export const isSameWeek = (date1: Date, date2: Date) => {
  return getDateWeek(date1) === getDateWeek(date2);
};

export const isThisWeek = (week: Date[]): boolean => {
  if (!week.length) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight for accurate comparison

  return week.some(date => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0); // Normalize each date in the array

    return d.getTime() === today.getTime();
  });
};
