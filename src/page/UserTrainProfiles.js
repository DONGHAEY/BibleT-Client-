import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderWithBack from "./HeaderWithBack";
import styled from "styled-components";
import { EmojiRoleSign } from "./util/role";
import Hoc from "../HOC/auth";

const UserTrainProfiles = () => {
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

  const MyTrainProfiles = (
    <div style={{ marginTop: "90px" }}>
      {trainProfiles.map((menu, index) => {
        return (
          <Train
            key={menu.train.id}
            onClick={() => navigate(`/train/${menu.train.id}`)}
          >
            <h3>{menu.train.trainName}</h3>
            <p>
              {menu.nickName} {EmojiRoleSign[menu.role]}
            </p>
            <span>정원 : {menu.train.memberCount}</span>
            <span>&nbsp;&nbsp;&nbsp;트랙 : {menu.train.trackAmount}개</span>
          </Train>
        );
      })}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );

  return (
    <div>
      <HeaderWithBack
        title={`${user.username}님의 기차들`}
        subtitle={`기차 수 : ${trainProfiles && trainProfiles.length}개`}
      />
      <div className="profiles">
        {MyTrainProfiles}
        <AddTrainButton onClick={() => navigate("/createTrain")}>
          성경 열차 만들기
        </AddTrainButton>
      </div>
    </div>
  );
};

// const

const Train = styled.div`
  background-color: whitesmoke;
  padding: 10px;
  width: 250px;
  height: 90px;
  margin: 30px;
  borderradius: 5%;
  cursor: pointer;
`;

const AddTrainButton = styled.button`
  border: 0;
  width: 230px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  position: fixed;
  bottom: 50px;
`;

export default Hoc(UserTrainProfiles);
