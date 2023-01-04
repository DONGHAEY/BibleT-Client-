import styled from "styled-components";

export const MainWrapper = styled.div`
  background-color: white;
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
`;

export const MainBtnWrapper = styled.div`
  margin-block: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LOGO = styled.h1`
  color: black;
  font-size: 14vh;
`;

export const Span = styled.span`
  color: black;
  font-size: 20px;
`;

export const LogInOutBtn = styled.div`
  font-size: 13px;
  margin-left: 5px;
  padding: 2px;
  cursor: pointer;
  color: black;
`;

export const NavigateButton = styled.div`
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

export const ButtonImg = styled.img`
  width: 70px;
  padding-inline: 5px;
`;
