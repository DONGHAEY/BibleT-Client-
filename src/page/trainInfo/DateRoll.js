import React, { useState } from "react";
import "../css/TEST2.css";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";

const Test2 = ({ checkStamps }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <div className="container" style={{ width: "85%" }}>
      <div>
        <button onClick={() => setYear((p) => p - 1)}>{" < "}</button>
        <span>{year}</span>
        <button onClick={() => setYear((p) => p + 1)}>{" > "}</button>
        <CalendarHeatmap
          startDate={new Date(year, 0, 0)}
          endDate={new Date(year, 12, -1)}
          values={
            checkStamps &&
            checkStamps.map((stamp) => {
              return {
                date: stamp.trackDate,
              };
            })
          }
          classForValue={(value) => {
            if (!value) {
              return "color-empty";
            }
            return `color-green`;
          }}
          tooltipDataAttrs={(value) => {
            if (!value || !value.date) {
              return null;
            }
            return {
              "data-tip": `${value.date} 참여완료 `,
            };
          }}
        />
      </div>
      <ReactTooltip />
    </div>
  );
};

export default Test2;
