import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { BsCardChecklist } from "@react-icons/all-files/bs/BsCardChecklist";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ tab }) => {
  return (
    <NavigationBar>
      <Test style={{ textDecoration: "none", color: "black" }} to="">
        <BsCardChecklist />
        <p>홈</p>
      </Test>
      <Test
        style={{ textDecoration: "none", color: "black" }}
        to="?tab=members"
      >
        <FiUsers />
        <p>멤버</p>
      </Test>
      <Test
        style={{ textDecoration: "none", color: "black" }}
        to="?tab=setting"
      >
        <AiOutlineSetting />
        <p>설정</p>
      </Test>
    </NavigationBar>
  );
};

const Icon = styled.span`
  margin-inline: 8.3%;
  cursor: pointer;
  width: 30%;
  text-align: center;
`;

const Test = styled(Link)`
  margin-inline: 8.3%;
  cursor: pointer;
  width: 30%;
  text-align: center;
`;

const NavigationBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 90px;
  background-color: rgba(250, 250, 250);
`;

export default Navigation;
