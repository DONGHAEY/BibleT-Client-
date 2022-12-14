import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HeaderWithBack from "../BibleTrain/HeaderWithBack";
import { FlexWrapperWithHeader } from "../../styledComponent/Wrapper";
import {
  FlexForm,
  FormInput,
  LoginRegisterBtn,
} from "../../styledComponent/LoginRegisterForm";
import { registerApi } from "../../api/user";

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { state } = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    if (name.length < 5 && name.length > 15) {
      alert("아이디는 5자보다 길고 15자보다 짧아야합니다!");
    } else if (email.length < 3) {
      alert("이메일을 입력해야합니다!");
    } else if (password.length < 6 && password.length > 20) {
      alert("비밀번호는 6자보다 길고, 20자보다 짧아야합니다!");
    } else {
      try {
        await registerApi({
          username: name,
          password: password,
          email: email,
        });
        alert("회원가입 성공!");
        navigate("/login", {
          state: {
            wait: state.wait,
            back: state.back ? state.back : "/",
          },
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  return (
    <>
      <HeaderWithBack path={state.back ? state.back : "/"} />
      <FlexWrapperWithHeader>
        <FlexForm onSubmit={(e) => submit(e)}>
          <h1
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              fontSize: "40px",
            }}
          >
            BibleT 간편가입
          </h1>
          <FormInput
            type="name"
            placeholder="사용 할 아이디를 입력해주세요"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FormInput>
          <FormInput
            type="email"
            placeholder="가지고 있는 이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormInput>
          <FormInput
            type="password"
            placeholder="사용 할 비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormInput>
          <LoginRegisterBtn>가입하기</LoginRegisterBtn>
        </FlexForm>
      </FlexWrapperWithHeader>
    </>
  );
};
