import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import './css/d.css'
import { ko } from "date-fns/esm/locale";

export const TEST = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContnet:"center", textAlign:"center"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop:'30px'}}>
            <div style={{ paddingInline:'10px' }}>
            <h3>시작날짜</h3>
            <DatePicker
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                className="input-datepicker"
                closeOnScroll={true}
                placeholderText="시작날 선택"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            </ div>
            <div style={{
                paddingInline:'10px'
            }}>
            <h3>종료날짜</h3>
            <DatePicker
                locale={ko} 
                dateFormat="yyyy년 MM월 dd일" 
                className="input-datepicker"
                closeOnScroll={true}
                placeholderText="끝날 선택"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
            />
            </div>
            </div>
        </div>
    )
}