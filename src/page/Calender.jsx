import React, { useState } from "react";
import { useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import ReactTooltip from "react-tooltip";
import { getStringDate } from "./util/dateForm";
import "./css/calender.css";
import styled from "styled-components";
import axios from "axios";

const Calender = ({ trainId, userId }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    (async () => {
      const yearStartDate = new Date(year, 0, 1);
      const yearEndDate = new Date(year + 1, 0, 0);
      let yearStartDateString = getStringDate(yearStartDate);
      let yearEndDateString = getStringDate(yearEndDate);
      try {
        const { data } = await axios.post(
          `/api/bible-track/${trainId}/profileOtherTrackList/${yearStartDateString}/${yearEndDateString}`,
          {
            userId,
          }
        );
        setTracks(data);
      } catch (e) {}
    })();
  }, [year]);
  return (
    <div className="container" style={{ width: "85%" }}>
      <div style={{ marginBottom: "10px" }}>
        <LeftRightButton onClick={() => setYear((p) => p - 1)}>
          {" < "}
        </LeftRightButton>
        <span style={{ fontWeight: "bold" }}>{year}년 참여현황</span>
        <LeftRightButton onClick={() => setYear((p) => p + 1)}>
          {" > "}
        </LeftRightButton>
      </div>
      <CalendarHeatmap
        startDate={new Date(year, 0, 0)}
        endDate={new Date(year + 1, 0, 0)}
        values={
          tracks &&
          tracks?.map((track) => {
            return {
              date: track?.date,
              status: track.status,
            };
          })
        }
        classForValue={(value) => {
          if (!value) {
            return "color-scale-2";
          }
          if (value?.status === "UNCOMPLETE") {
            return "color-scale-1";
          }
          if (value?.status === "COMPLETE") {
            return `color-scale-3`;
          }
        }}
        showOutOfRangeDays={true}
        tooltipDataAttrs={(value) => {
          if (value?.status === "UNCOMPLETE") {
            return {
              "data-tip": `${value.date} 트랙 미참여`,
            };
          }
          if (value?.status === "COMPLETE") {
            return {
              "data-tip": `${value.date} 트랙 참여`,
            };
          }
          return {
            "data-tip": `트랙없음`,
          };
        }}
      />
      <ReactTooltip />
    </div>
  );
};

const LeftRightButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  margin-inline: 10px;
  cursor: pointer;
  color: black;
`;

export default Calender;
