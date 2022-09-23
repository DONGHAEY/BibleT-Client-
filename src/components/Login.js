import "./css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../actions/userLogin";
import React, { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack";

export const Login = () => {
  const { loading, user, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      userLogin({
        username: name,
        password: password,
      })
    ).then((response) => {
      if (response.payload.success) {
        navigate(state && state.wait ? state.wait : "/");
      } else {
        alert("유저네임이 올바르지 않거나 비밀번호가 올바르지 않습니다");
      }
    });
  };

  return (
    <>
      <HeaderWithBack path={-1} />
      <div>
        <form className="login__form" onSubmit={(e) => submit(e)}>
          <h1>BibleT 로그인</h1>
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
          <button className="submit__btn">submit</button>
          <a
            onClick={() =>
              navigate("/register", {
                state: {
                  wait: (state && state.wait) || "",
                },
              })
            }
          >
            가입하기
          </a>
          <a>아이디와 비밀번호 찾기</a>
        </form>
      </div>
    </>
  );
};
