import "./css/login.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../actions/userRegister";
import { useLocation } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack";
import { FlexWrapperWithHeader } from "../styledComponent/Wrapper";
import {
  FlexForm,
  FormInput,
  LoginRegisterBtn,
} from "../styledComponent/LoginRegisterForm";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
            back: state.back ? state.back : "/",
          },
        });
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    });
  };

  if (loading) {
    return <></>;
  }

  return (
    <>
      <HeaderWithBack path={state.back ? state.back : "/"} />
      <FlexWrapperWithHeader>
        <FlexForm onSubmit={(e) => submit(e)}>
          <h1>BibleT 회원가입</h1>
          <FormInput
            type="name"
            placeholder="아이디"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormInput>
          <FormInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormInput>
          <FormInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <LoginRegisterBtn>submit</LoginRegisterBtn>
        </FlexForm>
      </FlexWrapperWithHeader>
    </>
  );
};
