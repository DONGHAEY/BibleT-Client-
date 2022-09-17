import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import { getStringDate, stringToDate } from "./util/dateForm";
import {요일} from './util/dateForm'
import HeaderWithBack from "./HeaderWithBack";
import { useLocation } from "react-router-dom";
import bibleData from './util/bible'
const bible = bibleData();




const Analysis = ({train, trainId, members}) => {
    var now = new Date();
    const [ period, setPeriod ] = useState({
        startDate: new Date(),
        endDate : new Date(now.setDate(now.getDate() +7)),
    });
    const location = useLocation();
    const [ list , setList ]= useState([]);

    useEffect(() => {
        loadData();
    }, [period]);


    const loadData = () => {
        axios.post(`/api/bible-track/${trainId}/analysis?startDate=${getStringDate(period.startDate)}&endDate=${getStringDate(period.endDate)}`).then(({data}) => {
            setList([...data]);
        })
    }

    return (
        <div>
            <HeaderWithBack title={train.trainName} subtitle={"분석하기"} path={location.pathname} />
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
            <div style={{display:'inline-flex', flexDirection:'row'}}>
                <div>
                <h4>시작</h4>
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
                })}
            />
                </div>
                <div style={{paddingInline:'10px'}}></div>
            <div>
            <h4>마무리</h4>
            <DatePicker
                locale={ko}
                dateFormat="yyyy년 MM월 dd일" 
                className="input-datepicker"
                closeOnScroll={false} 
                placeholderText="날짜 선택" 
                selected={period.endDate}
                onChange={(date) => setPeriod(prev => {
                    return {
                        startDate:prev.startDate,
                        endDate:date
                    }
                })}
            />
            </div>
            </div>
            <div style={{marginTop:'50px', width:'100%'}}>
                <h2>🛤 성경열차 트랙 현황표 🛤</h2>
                <table border={0} style={{textAlign:'center', width:'100%', backgroundColor:'rgba(240, 240, 240,0.9)',paddingBlock:'15px', border:"solid 0.5", marginTop:'15px'}}>
                <tr>
            {
                list.map((track, idx) => {
                    const date = stringToDate(track.date);
                    console.log(date);
                    return <th style={{fontSize:'11px'}} key={idx}>{track.date}({요일[date.getDay()]})</th>
                })
            }
            </tr>
            <tr>
            {
                list.map((track, idx) => {
                    const date = stringToDate(track.date);
                    return <td style={{fontSize:'11px'}} key={idx}>{bible && bible[track.startChapter-1].sign}{track.startPage}-{bible && bible[track.startChapter-1].sign}{track.endPage}</td>
                })
            }
            </tr>
                </table>
            </div>
            <div style={{marginTop:'25px', width:"100%"}}>
                <h2>🚆 성경읽기 현황표 🚆</h2>
            <table border={0} style={{textAlign:'center', width:'100%', backgroundColor:'rgba(240, 240, 240,0.9)',paddingBlock:'15px' ,border:"solid 0.5", marginTop:'15px'}}>
            <tr>
            <th ></th>
            {
                list.map((track, idx) => {
                    const date = stringToDate(track.date);
                    console.log(date);
                    return <th style={{fontSize:'9px'}} key={idx}>{track.date}({요일[date.getDay()]})</th>
                })
            }
            </tr>
            {
                members.map((member, idx) => {
                    return <tr style={{lineHeight:'15px'}}>
                        <th style={{}}>{member.nickName}</th>
                        {list.map((track, trackIdx) => {
                        return <td style={{}} key={{trackIdx, usrId : member.userId}}>{track.checkStamps && track.checkStamps.find(stmp => stmp.userId === member.userId ) ? "❤️" : "•"}</td>
                    })}</tr>
                })
            }
        </table>
            </div>
            </div>
        </div>
    )



}

export default Analysis;