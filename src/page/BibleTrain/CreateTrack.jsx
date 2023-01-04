import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import Select from "./Select";
import { getStringDate } from "../../util/dateForm";
import { useContext } from "react";
import { BibleTrainContext } from "./BibleTrain";
import { createTrackApi } from "../../api/bibletracks";

registerLocale("ko", ko);

export default function CreateTrack({ onClose, loadTracksData }) {
  const [selected, setSelected] = useState({});
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const { bibleTrain, loadTrainInfo } = useContext(BibleTrainContext);

  const createTrackHandler = async () => {
    try {
      const { start, end } = selected;
      await createTrackApi({
        date: getStringDate(date),
        startChapter: start.selectedChapter,
        endChapter: end.selectedChapter,
        startPage: start.selectedPage,
        endPage: end.selectedPage,
        content: content,
        trainId: bibleTrain.id,
      });
      alert("트랙 생성이 성공적으로 완료되었습니다");
      loadTracksData();
      loadTrainInfo();
      onClose(false);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container>
      <CreateTrackPopUpWrapper>
        <Title>트랙 생성하기</Title>
        <div>
          <DatePicker
            dateFormat="yyyy년 MM월 dd일" // 날짜 형식 설정
            className="input-datepicker" // 클래스 명 지정 css주기 위해   // 선택할 수 있는 최소 날짜값 지정
            placeholderText="트랙 날짜 선택" // placeholder
            selected={date}
            onChange={(date) => setDate(date)} // 날짜를 선택하였을 때 실행될 함수
          />
        </div>
        <div>
          <span style={{ fontSize: "10px" }}>시작</span>
          <Select
            select={({ selectedChapter, selectedPage }) => {
              setSelected((prev) => {
                return {
                  start: {
                    selectedChapter,
                    selectedPage,
                  },
                  end: prev.end,
                };
              });
            }}
          />
          <span style={{ fontSize: "10px" }}>끝</span>
          <Select
            select={({ selectedChapter, selectedPage }) => {
              setSelected((prev) => {
                return {
                  start: prev.start,
                  end: {
                    selectedChapter,
                    selectedPage,
                  },
                };
              });
            }}
          />
        </div>
        <div>
          <input
            style={{ width: "150px", marginBlock: "15px", border: 0 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="기타사항을 입력해주세요"
          />
        </div>
        <AddBtn onClick={createTrackHandler}>추가하기</AddBtn>
        <p onClick={() => onClose(false)}>취소</p>
      </CreateTrackPopUpWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreateTrackPopUpWrapper = styled.div`
  max-width: 80%;
  min-width: 40%;
  height: 50%;
  padding-inline: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5%;
  background: rgba(250, 250, 250, 0.99);
`;

const Title = styled.h1`
  font-size: 30px;
  margin-block: 10px;
`;

const AddBtn = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 8%;
  border: 0;
  background-color: black;
  color: white;
`;
