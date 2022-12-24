import "./css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../actions/userRegister";
import { useLocation } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack";
import { selectUser } from "../features/userSlice";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { state } = useLocation();
  const { loading } = useSelector((prev) => prev.user);

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      userRegister({
        username: name,
        password: password,
        email: email,
      })
    ).then((response) => {
      if (response.payload.success) {
        alert("회원가입에 성공하였습니다.");
        navigate("/login", {
          state: {
            wait: state.wait,
          },
        });
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  };

  if (loading) {
    return <h1>로딩중입니다... 잠시만 기다려주세요..</h1>;
  }

  return (
    <>
      <HeaderWithBack path={-1} />
      <div style={{ marginTop: "90px" }}>
        <form className="login__form" onSubmit={(e) => submit(e)}>
          <h1>BibleT 회원가입</h1>
          <input
            type="name"
            placeholder="아이디"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button className="submit__btn">submit</button>
        </form>
      </div>
    </>
  );
};
