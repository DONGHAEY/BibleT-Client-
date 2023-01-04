import React, { useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderWithBack from "../BibleTrain/HeaderWithBack";
import { FlexWrapperWithHeader } from "../../styledComponent/Wrapper";
import {
  FlexForm,
  FormInput,
  LoginRegisterBtn,
} from "../../styledComponent/LoginRegisterForm";
import { loginApi } from "../../api/user";
import styled from "styled-components";

export const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(name, password);
      if (data.success) {
        navigate(state && state.wait ? state.wait : "/");
      } else {
        alert("로그인이 정상적으로 처리되지 않았습니다.");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <HeaderWithBack path={state?.back ? state?.back : -1} />
      <FlexWrapperWithHeader>
        <FlexForm onSubmit={(e) => submit(e)}>
          <div
            style={{
              display: "inline",
              paddingInline: "50px",
              paddingBlock: "50px",
            }}
          >
            <div>
              <H1>BibleT</H1>
            </div>
            <div>
              <H1>로그인</H1>
            </div>
          </div>
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
          <LoginRegisterBtn>로그인하기</LoginRegisterBtn>
          <div style={{ marginTop: "15px" }}>
            <A
              onClick={() =>
                navigate("/register", {
                  state: {
                    wait: (state && state.wait) || "",
                    back: "/",
                  },
                })
              }
            >
              회원가입하기
            </A>
            <a>&nbsp;</a>
            <A>비밀번호 찾기</A>
          </div>
        </FlexForm>
      </FlexWrapperWithHeader>
    </>
  );
};

const H1 = styled.h1`
  font-size: 65px; ;
`;

const A = styled.a`
  font-size: 12px;
  cursor: pointer;
`;
