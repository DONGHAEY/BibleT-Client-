import "./css/Main.css";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Hoc from "../HOC/auth";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/userLogout";
import styled from "styled-components";

const Main = () => {
  const { loading, user, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(userLogout());
      alert("로그아웃 완료");
      window.location.reload();
    } catch (e) {
      alert("에러 발생");
    }
  };

  return (
    <MainCompo>
      <LOGO>BibleT</LOGO>
      <div>
        <span>{user ? user.username + "님" : "로그인하세요"}</span>
        <LoginStatus onClick={user ? handleLogout : () => navigate("/login")}>
          {user ? "로그아웃" : "로그인"}
        </LoginStatus>
      </div>
      <FUNCTIONBUTTONS>
        <BUTTON onClick={() => navigate("/userTrainProfiles")}>
          <BUTTONIMG src={"./png/train.png"}></BUTTONIMG>
          <h2>내 성경열차</h2>
        </BUTTON>
        <BUTTON>
          <BUTTONIMG src={"./png/bible.png"}></BUTTONIMG>
          <h2>성경읽기 기록</h2>
        </BUTTON>
      </FUNCTIONBUTTONS>
    </MainCompo>
  );
};

const MainCompo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const LoginStatus = styled.div`
  font-size: 13px;
  color: gray;
  margin-left: 5px;
`;

const LOGO = styled.h1`
  color: rebeccapurple;
  font-size: 15vh;
  margin-top: 50px;
`;

const FUNCTIONBUTTONS = styled.div`
  display: flex;
  margin-top: 25px;
`;

const BUTTON = styled.div`
  margin: 5px;
  border-radius: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gainsboro;
  min-width: 30vh;
  height: 30vh;
  font-size: 2.5vh;
`;

const BUTTONIMG = styled.img`
  width: 60px;
`;

export default Hoc(Main, true);
