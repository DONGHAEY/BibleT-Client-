import { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import './css/d.css'
import Select from "./Select";
import axios from "axios";

export default function PopUp({onClose, train}) {
    const [selected, setSelected] = useState({});
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());

    const createTrackApi = () => {
        const { start, end } = selected;
        axios.post(`/api/bible-track/${train.id}/addTrack`, {
            date: `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`,
            startChapter: start.selectedChapter,
            endChapter: end.selectedChapter,
            startPage: start.selectedPage,
            endPage: end.selectedPage,
            content: content
        }).then(({data}) => {
            if(data === "okay") {
                alert("트랙 생성이 성공적으로 완료되었습니다");
                onClose(false);
            }
        }).catch((e) => {
            alert(e.response.data.message);
        })
    }

    return (
        <Container >
            <div style={{maxWidth:'80%', minWidth:'40%', height:'50%', paddingInline:'30px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', borderRadius:'5%', background: 'rgba(250, 250, 250, 0.99)'}} >
                <h1 style={{fontSize:'30px', marginBlock:'10px'}}>트랙 생성하기</h1>
                <DatePicker
                    locale={ko} 
                    dateFormat="yyyy년 MM월 dd일"
                    className="input-datepicker"
                    closeOnScroll={true}
                    placeholderText="트랙날짜선택"
                    selected={date}
                    onChange={(date) => setDate(date)}
                />
                <div>
                <span style={{fontSize:'10px'}}>시작</span>
                <Select select={({selectedChapter, selectedPage}) => {
                    setSelected(prev => {
                        return {
                        start: {
                            selectedChapter,
                            selectedPage
                        },
                        end : prev.end
                    }
                    })
                }} />
                <span style={{fontSize:'10px'}}>끝</span>
                <Select select={({selectedChapter, selectedPage}) => {
                    setSelected(prev => {
                        return {
                        start : prev.start,
                        end:{
                            selectedChapter,
                            selectedPage,
                        }}
                    })
                }} />
            </div>
            <div>
                <input style={{width:'150px', marginBlock:'15px', border:0}} value={content} onChange={(e) => setContent(e.target.value)} placeholder="기타사항을 입력해주세요" />
            </div>
            <button style={{width:'150px', height:'30px', borderRadius:'8%', border:0, backgroundColor:'black', color:'white'}} onClick={() => createTrackApi()}>추가하기</button>
            <p style={{fontSize:'20px', cursor:'pointer', marginTop:'5px'}} onClick={() => onClose(false)}>취소</p>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width:100%;
    height:100%;
    border-radius:15px;
    top:0;
    bottom:0;
    position:fixed;
    z-index : 100;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`