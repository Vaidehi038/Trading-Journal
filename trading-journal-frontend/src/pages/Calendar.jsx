import { useEffect, useState } from "react";

function Calendar() {
  const today = new Date();
  

  const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/calendar?month=${month}&year=${year}`)
      .then(res => res.json())
      .then(setData);
  }, [month, year]);


  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const daysArray = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push({ empty: true });
  }


  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    daysArray.push({ day: i, dateStr });
  }

  return (
 <div className="container-fluid">

  <h2 className="fw-bold mb-4 text-center">
    Calendar
  </h2>


  <div className="card shadow-sm border-0 p-4">

    {/* Month + Year + Heading */}
    <div className="d-flex justify-content-between align-items-center mb-4">

      <div className="d-flex gap-3">
        <select
          className="form-select w-auto"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((m, index) => (
            <option key={index} value={index + 1}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="form-control w-auto"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      {/* Month display  */}
      <h5 className="mb-0">
        {months[month - 1]} {year}
      </h5>

    </div>
    <div className="calendar-header">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className="calendar-day-name">
        {day}
      </div>
    ))}
    </div>

    {/* Calendar Grid */}
    <div className="calendar-grid">
     {daysArray.map((item, index) => {
        if (item.empty) {
        return <div key={index} className="calendar-cell empty"></div>;
      }

    const pnl = data[item.dateStr];

    return (
        <div key={item.day} className="calendar-cell">
        <div className="calendar-date">{item.day}</div>

        {pnl !== undefined && (
          <div className={`calendar-pnl ${pnl >= 0 ? "profit" : "loss"}`}>
            {pnl >= 0 ? `+$${pnl}` : `-$${Math.abs(pnl)}`}
          </div>
        )}
    </div>
  );
})}
    </div>

  </div>
 

</div>

    
  );
}

export default Calendar;