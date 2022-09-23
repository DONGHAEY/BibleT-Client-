import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "./css/d.css";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { getStringDate, stringToDate } from "./util/dateForm";
import { 요일 } from "./util/dateForm";
import HeaderWithBack from "./HeaderWithBack";
import { useLocation } from "react-router-dom";
import bibleData from "./util/bible";
import ApexCharts from "react-apexcharts";

const bible = bibleData();

const Analysis = ({ train, trainId, members }) => {
  const now = new Date();
  const [period, setPeriod] = useState({
    startDate: new Date(),
    endDate: new Date(now.setDate(now.getDate() + 7)),
  });
  const location = useLocation();
  const [list, setList] = useState([]);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = () => {
    axios
      .post(
        `/api/bible-track/${trainId}/analysis?startDate=${getStringDate(
          period.startDate
        )}&endDate=${getStringDate(period.endDate)}`
      )
      .then(({ data }) => {
        setList([...data]);
      });
  };

  return (
    <div>
      <HeaderWithBack
        title={train.trainName}
        subtitle={"분석하기"}
        path={location.pathname + "?tab=setting"}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "inline-flex", flexDirection: "row" }}>
          <div>
            <h4>시작</h4>
            <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              className="input-datepicker"
              closeOnScroll={false}
              placeholderText="날짜 선택"
              selected={period.startDate}
              onChange={(date) =>
                setPeriod((prev) => {
                  return {
                    endDate: prev.endDate,
                    startDate: date,
                  };
                })
              }
            />
          </div>
          <div style={{ paddingInline: "10px" }}></div>
          <div>
            <h4>마무리</h4>
            <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              className="input-datepicker"
              closeOnScroll={false}
              placeholderText="날짜 선택"
              selected={period.endDate}
              onChange={(date) =>
                setPeriod((prev) => {
                  return {
                    startDate: prev.startDate,
                    endDate: date,
                  };
                })
              }
            />
          </div>
        </div>
        <div style={{ width: "95%" }}>
          <ApexCharts
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
              },
              stroke: {
                curve: "straight",
              },
              title: {
                text: "참여자 한눈에 보기",
                align: "center",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              xaxis: {
                categories: list && list.map((track) => track.date),
              },
            }}
            series={[
              {
                name: "참여자",
                data:
                  list &&
                  list.map(
                    (track) => track.checkStamps && track.checkStamps.length
                  ),
              },
              {
                name: "미참여자",
                data:
                  list &&
                  list.map(
                    (track) =>
                      track.checkStamps &&
                      members.length - track.checkStamps.length
                  ),
              },
            ]}
            typs="line"
            width={"100%"}
            height={"250px"}
          />
        </div>
        <div
          style={{
            marginTop: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "15px" }}>🛤 읽기 일정표 🛤</h2>
          <table
            style={{
              textAlign: "center",
              width: "95%",
              backgroundColor: "none",
              marginTop: "15px",
              borderSpacing: "0px",
              border: "0.5px solid black",
            }}
          >
            <tr>
              {list.map((track, idx) => {
                const date = stringToDate(track.date);
                return (
                  <th
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      backgroundColor: "yellow",
                      border: "0.5px solid black",
                      lineHeight: "30px",
                    }}
                    key={idx}
                  >
                    {track.date}({요일[date.getDay()]})
                  </th>
                );
              })}
            </tr>
            <tr>
              {list.map((track, idx) => {
                const date = stringToDate(track.date);
                return (
                  <td
                    style={{
                      fontSize: "10px",
                      backgroundColor: "none",
                      border: "0.5px solid black",
                      lineHeight: "30px",
                    }}
                    key={idx}
                  >
                    {bible && bible[track.startChapter - 1].sign}
                    {track.startPage}-
                    {bible && bible[track.startChapter - 1].sign}
                    {track.endPage}
                  </td>
                );
              })}
            </tr>
          </table>
        </div>
        <div
          style={{
            marginTop: "25px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontSize: "15px" }}>🚆 읽기 현황표 🚆</h2>
          <span style={{ padding: "10px", fontSize: "10px" }}>
            ❤️ : 참여완료, • : 미완료
          </span>
          <table
            style={{
              textAlign: "center",
              width: "95%",
              backgroundColor: "none",
              marginTop: "15px",
              borderSpacing: "0px",
              border: "0.5px solid black",
            }}
          >
            <tr>
              <th
                style={{
                  border: "0.5px solid black",
                  fontSize: "10px",
                  backgroundColor: "gold",
                }}
              >
                이름\날짜
              </th>
              {list.map((track, idx) => {
                const date = stringToDate(track.date);
                return (
                  <th
                    style={{
                      fontSize: "11px",
                      backgroundColor: "yellow",
                      border: "0.5px solid black",
                      lineHeight: "30px",
                    }}
                    key={idx}
                  >
                    {track.date}({요일[date.getDay()]})
                  </th>
                );
              })}
            </tr>
            {members.map((member, idx) => {
              return (
                <tr style={{ lineHeight: "15px" }}>
                  <th
                    style={{
                      fontSize: "11px",
                      border: "0.5px solid black",
                      lineHeight: "30px",
                      backgroundColor: "none",
                    }}
                  >
                    {member.nickName}
                  </th>
                  {list.map((track, trackIdx) => {
                    return (
                      <td
                        style={{
                          backgroundColor: "none",
                          border: "0.5px solid black",
                          fontSize: "15px",
                        }}
                        key={{ trackIdx, usrId: member.userId }}
                      >
                        {track.checkStamps &&
                        track.checkStamps.find(
                          (stmp) => stmp.userId === member.userId
                        )
                          ? "❤️"
                          : "•"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
