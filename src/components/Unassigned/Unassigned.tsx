import './Unassigned.css';
import Pool from "../Pool/Pool";

function Unassigned() {
  return (
    <Pool classNames="unassignedPool" id={"Unassigned"} type="unassigned" date={new Date("1971/01/01")}/>
  );
}

export default Unassigned;
