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
        <BUTTON onClick={() => navigate("/myBibleTrainProfiles")}>
          <BUTTONIMG src={"./png/train.png"}></BUTTONIMG>
          <div style={{ paddingInline: "5px" }}></div>
          <span>내 성경열차</span>
        </BUTTON>
        <BUTTON>
          <BUTTONIMG src={"./png/bible.png"}></BUTTONIMG>
          <div style={{ paddingInline: "5px" }}></div>
          <span>개인 기록</span>
        </BUTTON>
        {/* <BUTTON>
          <BUTTONIMG
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1rsaEJ9l42S8uioYTcPVaJIbsM30Q9WN4Q&usqp=CAU"
            }
          ></BUTTONIMG>
          <span>앱으로 설치</span>
        </BUTTON> */}
      </FUNCTIONBUTTONS>
    </MainCompo>
  );
};

const MainCompo = styled.div`
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

const LoginStatus = styled.div`
  font-size: 13px;
  color: gray;
  margin-left: 5px;
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

const BUTTON = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-top: 10px;
  cursor: pointer;
  width: 90%;
  background-color: whitesmoke;
`;

const BUTTONIMG = styled.img`
  width: 70px;
  padding-inline: 5px;
`;

export default Hoc(Main, true);
