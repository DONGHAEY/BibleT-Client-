import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './css/d.css'
import { ko } from "date-fns/esm/locale";

export const DateEx = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContnet:"center", textAlign:"center"}}>
            <h1>참여자 현황</h1>
            <h2>무궁화호(동삼교회)</h2>
            <h3>총 35명</h3>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop:'30px'}}>
            <div style={{
                paddingInline:'10px'
            }}>
            <h3>시작날짜</h3>
            <DatePicker
                locale={ko}    // 언어설정 기본값은 영어
                dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
                className="input-datepicker"    // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정 
                closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="시작날 선택"    // placeholder
                selected={startDate}    // value
                onChange={(date) => setStartDate(date)}    // 날짜를 선택하였을 때 실행될 함수
            />
            </div>
            <div style={{
                paddingInline:'10px'
            }}>
            <h3>종료날짜</h3>
            <DatePicker
                locale={ko}    // 언어설정 기본값은 영어
                dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
                className="input-datepicker"    // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정 
                closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
                placeholderText="끝날 선택"    // placeholder
                selected={endDate}    // value
                onChange={(date) => setEndDate(date)}    // 날짜를 선택하였을 때 실행될 함수
            />
            </div>
            </div>
            <div style={{marginTop:'60px'}}>
            <table
                border="1"
                cellspacing="0.5">
            <thead>
                <tr align="center">
                    <td>날짜/이름</td>
                    <td>오동통</td>
                    <td>골리앗</td>
                    <td>다윗A</td>
                    <td>아담A</td>
                    <td>하와A</td>
                    <td>요한A</td>
                </tr>
            </thead>

            <tbody>
                <tr align="center">
                    <td>2022.08.01</td>
                    <td>O</td>
                    <td>O</td>
                    <td>O</td>
                    <td>O</td>
                    <td>O</td>
                    <td>O</td>
                </tr>
                <tr align="center" >
                  <td>2022.08.02</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                    <td>O</td>
                    <td>O</td>
                </tr>
                <tr align="center" >
                  <td>2022.08.03</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                    <td>O</td>
                    <td>O</td>
                </tr>
                <tr align="center">
                  <td>2022.08.04</td>
                  <td>O</td>
                  <td>O</td>
                  <td>X</td>
                  <td>O</td>
                    <td>O</td>
                    <td>O</td>
                </tr>
            </tbody>
        </table>
            </div>
        </div>
    )
}