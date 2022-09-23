import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hoc from "../HOC/auth";
import HeaderWithBack from "./HeaderWithBack";
import styled from "styled-components";

const UserProfile = () => {
  const [trainProfiles, setTrainProfiles] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post("/api/train/trainProfiles").then(({ data }) => {
      setTrainProfiles((prev) => {
        return [...prev, ...data];
      });
    });
  }, []);

  const role = {
    ROLE_CAPTAIN: "🧑‍✈️",
    ROLE_CREW: "🧑‍🏭",
    ROLE_VIEWER: "뷰어",
  };

  const menuList = trainProfiles.map((menu, index) => {
    return (
      <Train
        key={menu.train.id}
        onClick={() => navigate(`/train/${menu.train.id}`)}
      >
        <h3>{menu.train.trainName}</h3>
        <p>
          {menu.nickName} {role[menu.role]}
        </p>
        <span>정원 : {menu.train.memberCount}</span>
        <span>&nbsp;&nbsp;&nbsp;트랙 : {menu.train.trackAmount}개</span>
      </Train>
    );
  });

  return user ? (
    <div>
      <HeaderWithBack
        title={`${user.username}님의 기차들`}
        subtitle={`기차 수 : ${trainProfiles && trainProfiles.length}개`}
      />
      <div className="profiles">
        <div>
          {menuList}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <AddTrain onClick={() => navigate("/createTrain")}>
          성경 열차 만들기
        </AddTrain>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const Train = styled.div`
  background-color: whitesmoke;
  padding: 10px;
  width: 250px;
  height: 90px;
  margin: 30px;
  borderradius: 5%;
  cursor: pointer;
`;

const AddTrain = styled.button`
  border: 0;
  width: 230px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  position: fixed;
  bottom: 50px;
`;

export default Hoc(UserProfile, false);
