import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Week from "../Week/Week";
import { useDispatch } from "react-redux";
import { dragAndDropTicket } from "../../features/todos/todoSlice";
import { getViewWeeksOfYear } from "../../utils";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import './Calendar.css';

function Calendar() {
  const weeksToShow = 5;
  const [startWeek, setStartWeek] = useState(6);
  const year = 2025;
  const weeks = getViewWeeksOfYear(year, weeksToShow, startWeek);
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over != null)
      dispatch(
        dragAndDropTicket({
          targetTodoId: event.active.id as string,
          toDate: new Date(event.over.id).toISOString(),
        })
      );
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" , justifyContent: "center"}}>
      <div>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="Calendar">
            {weeks.map((week) => (
              <Week week={week} />
            ))}
          </div>
        </DndContext>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setStartWeek(startWeek - 1)}>
          <FaArrowUp />
        </button>
        <button onClick={() => setStartWeek(startWeek + 1)}>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
}

export default Calendar;
