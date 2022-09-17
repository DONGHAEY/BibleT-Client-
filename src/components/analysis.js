import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import { getStringDate, stringToDate } from "./util/dateForm";
import {요일} from './util/dateForm'




const Analysis = ({train, trainId, members}) => {

    const [ period, setPeriod ] = useState({
        startDate:new Date(),
        endDate : new Date(),
    });

    const [ list , setList ]= useState([]);

    useEffect(() => {
        loadData();
    }, [period]);


    const loadData = () => {
        axios.post(`/api/bible-track/${trainId}/analysis?startDate=${getStringDate(period.startDate)}&endDate=${getStringDate(period.endDate)}`).then(({data}) => {
            setList([...data]);
            console.log(data);
            // console.log(getDateRangeData(period.startDate, period.endDate));
        })
    }



    return (
        <div>
            <DatePicker
                locale={ko}    // 언어설정 기본값은 영어
                dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
                className="input-datepicker"    // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정 
                closeOnScroll={false}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="날짜 선택"    // placeholder
                selected={period.startDate}    // value
                onChange={(date) => setPeriod(prev => {
                    return {
                        endDate:prev.endDate,
                        startDate:date
                    }
                })} // 날짜를 선택하였을 때 실행될 함수
            />
            <DatePicker
                locale={ko}    // 언어설정 기본값은 영어
                dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
                className="input-datepicker"    // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정 
                closeOnScroll={false}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="날짜 선택"    // placeholder
                selected={period.endDate}    // value
                onChange={(date) => setPeriod(prev => {
                    return {
                        startDate:prev.startDate,
                        endDate:date
                    }
                })} // 날짜를 선택하였을 때 실행될 함수
            />
            <table border="1" style={{textAlign:'center'}}>
            <caption>성경열차 읽기 현황</caption>
            <tr>
            <th>이름</th>
            {
                list.map((track, idx) => {
                    const date = stringToDate(track.date);
                    console.log(date);
                    return <th key={idx}>{요일[date.getDay()]}</th>
                })
            }
            </tr>
            {
                members.map((member, idx) => {

                    return <tr>
                        <td>{member.nickName}</td>
                        {list.map((track, trackIdx) => {
                        return <td key={{trackIdx, usrId : member.userId}}>{track.checkStamps && track.checkStamps.find(stmp => stmp.userId === member.userId ) ? "❤️" : ""}</td>
                    })}</tr>

                })
            }
        </table>
        </div>
    )



}

export default Analysis;