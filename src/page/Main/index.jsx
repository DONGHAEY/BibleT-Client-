import React from "react";
import { LOGO, MainBtnWrapper, MainWrapper, Span, LogInOutBtn } from "./style";
import { useNavigate } from "react-router-dom";
import Hoc from "../../hoc/auth";
import { NavigateButton, ButtonImg } from "./style";
import { logoutApi } from "../../api/user";
import { useRecoilState } from "recoil";
import { userState } from "../../store/UserStore";

const Main = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const data = await logoutApi();
    if (data.success) {
      alert("로그아웃 완료");
      setUser(null);
      // window.location.reload();
    } else {
      alert("로그아웃 실패");
    }
  };

  return (
    <MainWrapper>
      <LOGO>BibleT</LOGO>
      <Span>{user ? user.username + "님" : "로그인하세요"}</Span>
      <LogInOutBtn onClick={user ? handleLogout : () => navigate("/login")}>
        {user ? "로그아웃 하기" : "로그인 하기"}
      </LogInOutBtn>
      <MainBtnWrapper>
        <MainPageButton
          link={"/myBibleTrainProfiles"}
          imgUrl={"./png/train.png"}
          btnName={"내 성경열차"}
        ></MainPageButton>
      </MainBtnWrapper>
    </MainWrapper>
  );
};

const MainPageButton = ({ link, imgUrl, btnName }) => {
  const navigate = useNavigate();
  return (
    <NavigateButton onClick={() => navigate(link)}>
      <ButtonImg src={imgUrl}></ButtonImg>
      <div style={{ paddingInline: "5px" }}></div>
      <span>{btnName}</span>
    </NavigateButton>
  );
};

export default Hoc(Main, true);
