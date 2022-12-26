import { AiOutlineSetting } from "@react-icons/all-files/ai/AiOutlineSetting";
import { BsCardChecklist } from "@react-icons/all-files/bs/BsCardChecklist";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ tab }) => {
  // const [tabN, setTabN] = useState(0);

  const tabs = [
    <Icon>
      <Link style={{ textDecoration: "none", color: "black" }} to="">
        <BsCardChecklist />
        <p>홈</p>
      </Link>
    </Icon>,
    <Icon>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="?tab=members"
      >
        <FiUsers />
        <p>멤버</p>
      </Link>
    </Icon>,
    <Icon>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to="?tab=setting"
      >
        <AiOutlineSetting />
        <p>설정</p>
      </Link>
    </Icon>,
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "80px",
        backgroundColor: "rgba(250, 250, 250)",
      }}
    >
      {tabs.map((tab) => tab)}
    </div>
  );
};

const Icon = styled.span`
  margin-inline: 8.3%;
  cursor: pointer;
  width: 30%;
`;

export default Navigation;