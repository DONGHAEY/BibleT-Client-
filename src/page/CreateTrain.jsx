import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import auth from "../HOC/auth";
import { FlexWrapper, FlexWrapperWithHeader } from "../styledComponent/Wrapper";
import HeaderWithBack from "./HeaderWithBack";

const CreateTrain = () => {
  const [trainName, setTrainName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [myNickName, setMyNickName] = useState("");

  const navigate = useNavigate();

  const clickEv = async () => {
    try {
      const train = await axios.post("/api/train/create", {
        trainName,
        churchName,
        captainName: myNickName,
      });
      navigate("/myBibleTrainProfiles");
    } catch (e) {
      alert(`열차를 생성할 수 없습니다 (${e.response.data.message})`);
      navigate("/myBibleTrainProfiles");
    }
  };

  return (
    <>
      <HeaderWithBack
        path={"/myBibleTrainProfiles"}
        title={"성경열차 생성"}
        subtitle={"하나님이 주실 생명의 열차"}
      />
      <FlexWrapperWithHeader>
        <InputBox
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
          placeholder="열차이름"
        ></InputBox>
        <InputBox
          value={churchName}
          onChange={(e) => setChurchName(e.target.value)}
          placeholder="교회 및 모임 이름"
        ></InputBox>
        <InputBox
          value={myNickName}
          onChange={(e) => setMyNickName(e.target.value)}
          placeholder="사용할 기관사 이름 ex)홍길동A"
        ></InputBox>
        <CreateTrainButton
          onClick={() => {
            clickEv();
          }}
        >
          성경 열차 만들기
        </CreateTrainButton>
      </FlexWrapperWithHeader>
    </>
  );
};

const MainS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const InputBox = styled.input`
  padding-inline: 15px;
  margin-top: 30px;
  min-width: 50%;
  max-width: 80%;
  height: 8vh;
  border: 0;
  border-radius: 5px;
  background-color: whitesmoke;
`;

const CreateTrainButton = styled.button`
  border: 0;
  width: 230px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  position: fixed;
  bottom: 50px;
`;

export default auth(CreateTrain);
