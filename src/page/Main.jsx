// import "./css/Main.css";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Hoc from "../HOC/auth";
import { useDispatch } from "react-redux";
import { userLogout } from "../actions/userLogout";
import styled from "styled-components";
import { MainPageButton } from "../component/MainPageButton";

const Main = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(userLogout()).then((data) => {
      if (data.payload.success) {
        alert("로그아웃 완료");
        window.location.reload();
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <MainWrapper>
      <LOGO>BibleT</LOGO>
      <LoginStatusSpan>
        {user ? user.username + "님" : "로그인하세요"}
      </LoginStatusSpan>
      <LoginStatus onClick={user ? handleLogout : () => navigate("/login")}>
        {user ? "로그아웃" : "로그인"}
      </LoginStatus>
      <FUNCTIONBUTTONS>
        <MainPageButton
          link={"/myBibleTrainProfiles"}
          imgUrl={"./png/train.png"}
          btnName={"내 성경열차"}
        ></MainPageButton>
        <MainPageButton
          link={"/myBibleTrainProfiles"}
          imgUrl={"./png/bible.png"}
          btnName={"개인기록"}
        ></MainPageButton>
        {/* <MainPageButton
          link={"/myBibleTrainProfiles"}
          imgUrl={"./png/bible.png"}
          btnName={"앱으로설치"}
        ></MainPageButton> */}
      </FUNCTIONBUTTONS>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const LOGO = styled.h1`
  color: black;
  font-size: 13vh;
`;

const FUNCTIONBUTTONS = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginStatusSpan = styled.span`
  font-size: 20px;
`;

const LoginStatus = styled.div`
  font-size: 13px;
  color: gray;
  margin-left: 5px;
`;

export default Hoc(Main, true);
