import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderWithBack from "./HeaderWithBack";
import styled from "styled-components";
import { EmojiRoleSign } from "./util/role";
import Hoc from "../HOC/auth";
import { FlexWrapperWithHeader } from "../styledComponent/Wrapper";
import { CreateTrainButton } from "../styledComponent/CreateTrainButton";

const BibleTrainProfiles = () => {
  const [trainProfiles, setTrainProfiles] = useState([]);
  const { loading, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const trainProfiles = await axios.post("/api/train/trainProfiles");
        setTrainProfiles([...trainProfiles.data]);
      } catch (e) {}
    })();
  }, []);

  if (!user) {
    return <>로딩중..</>;
  }

  const BibleTrainProfiles = trainProfiles.length ? (
    trainProfiles?.map((menu, index) => {
      return (
        <BibleTrainDiv
          key={menu.train.id}
          onClick={() => navigate(`/train/${menu.train.id}`)}
        >
          <h3>{menu.train.trainName}</h3>
          <p>
            {menu.nickName} {EmojiRoleSign[menu.role]}
          </p>
          <span>정원 : {menu.train.memberCount}</span>
          <span>&nbsp;&nbsp;&nbsp;트랙 : {menu.train.trackAmount}개</span>
        </BibleTrainDiv>
      );
    })
  ) : (
    <NoTrainDiv>
      <p>열차가 1도 없네요..</p>
      <p>만들면 되죠!</p>
      <p>가입하면 되죠!</p>
    </NoTrainDiv>
  );

  return (
    <>
      <HeaderWithBack
        title={`${user.username}님의 성경열차`}
        subtitle={`기차 수 : ${trainProfiles && trainProfiles.length}개`}
      />
      <FlexWrapperWithHeader style={{ marginBottom: "300px" }}>
        {BibleTrainProfiles}
        <CreateTrainButton onClick={() => navigate("/createTrain")}>
          성경 열차 만들기
        </CreateTrainButton>
      </FlexWrapperWithHeader>
    </>
  );
};

const BibleTrainDiv = styled.div`
  background-color: whitesmoke;
  padding: 10px;
  width: 90%;
  height: 90px;
  margin-top: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

const NoTrainDiv = styled.div`
  font-size: 3vh;
  margin-top: 15vh;
`;

export default Hoc(BibleTrainProfiles);
