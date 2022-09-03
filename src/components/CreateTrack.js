// import { useState } from "react";
// import DatePicker from "react-datepicker";

// const CreateTrack = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [description, setDescription] = useState("");
//     const [startChapter, setStartChapter] = useState(1);
//     const [endChapter, setEndChapter] = useState(1);
//     const [startPage, setStartPage] = useState(1);
//     const [endPage, setEndpage] = useState(1);

//     return (
//         <div>
//             <DatePicker
//                 locale={ko}    // 언어설정 기본값은 영어
//                 dateFormat="yyyy년 MM월 dd일"    // 날짜 형식 설정
//                 className="input-datepicker"    // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정 
//                 closeOnScroll={true}    // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
//                 placeholderText="시작날 선택"    // placeholder
//                 selected={startDate}    // value
//                 onChange={(date) => setSelectedDate(date)}    // 날짜를 선택하였을 때 실행될 함수
//             />
//             <input placeholder="트랙 설명"></input>
//             <select name="startChapter">
//                 <option value={1}>창세기</option>
//                 <option value={2}>출애굽기</option>
//                 <option value={3}>레위기</option>
//             </select>
//             <select name="endChapter">
//                 <option value={1}>창세기</option>
//                 <option value={2}>출애굽기</option>
//                 <option value={3}>레위기</option>
//             </select>
//         </div>
//     )
// }

// export default CreateTrack;