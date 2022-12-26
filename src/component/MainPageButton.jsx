import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const MainPageButton = ({ link, imgUrl, btnName }) => {
  const navigate = useNavigate();
  return (
    <BUTTON onClick={() => navigate(link)}>
      <BUTTONIMG src={imgUrl}></BUTTONIMG>
      <div style={{ paddingInline: "5px" }}></div>
      <span>{btnName}</span>
    </BUTTON>
  );
};

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
