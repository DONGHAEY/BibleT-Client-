import styled from "styled-components";

export const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormInput = styled.input`
  min-width: 180px;
  width: 210px;
  padding-inline: 10px;
  height: 40px;
  margin: 5px;
  border: 0;
  background-color: rgba(230, 230, 230);
  border-radius: 5%;
`;

export const LoginRegisterBtn = styled.button`
  width: 230px;
  height: 40px;
  border: 0;
  margin-top: 15px;
  background-color: black;
  color: white;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5%;
  cursor: pointer;
`;

export const KakaoLoginBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 40px;
  border: 0;
  margin: 5px;
  background-color: #f7e600;
  color: black;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5%;
  cursor: pointer;
`;
