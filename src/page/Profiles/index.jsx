import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import { useNavigate } from "react-router-dom";
import HeaderWithBack from "../BibleTrain/HeaderWithBack";
import { EmojiRoleSign } from "../../util/role";
import Hoc from "../../hoc/auth";
import { FlexWrapperWithHeader } from "../../styledComponent/Wrapper";
import { CreateTrainButton } from "../../styledComponent/CreateTrainButton";
import { BibleTrainDiv, NoTrainDiv } from "./style";
import { userState } from "../../store/UserStore";
import { useRecoilValue } from "recoil";
import { trainProfilesApi } from "../../api/bibletrain";

const BibleTrainProfiles = () => {
  const user = useRecoilValue(userState);
  const [trainProfiles, setTrainProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setTrainProfiles(await trainProfilesApi());
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  const BibleTrainProfiles = trainProfiles.length ? (
    trainProfiles?.map((menu, index) => {
      return (
        <BibleTrainDiv
          key={menu.train.id}
          onClick={() => navigate(`/train/${menu.train.id}`)}
        >
          <h3>{menu.train.trainName}</h3>
          <p>
            {menu.nickName} {EmojiRoleSign[menu.role]}
          </p>
          <div>
            <span>정원 : {menu.train.memberCount}</span>
            <span>&nbsp;&nbsp;&nbsp;트랙 : {menu.train.trackAmount}개</span>
          </div>
        </BibleTrainDiv>
      );
    })
  ) : (
    <NoTrainDiv>
      <p>열차가 1도 없으니</p>
      <p>만들면 되죠!</p>
      <p>가입하면 되죠!</p>
    </NoTrainDiv>
  );

  return (
    <>
      <HeaderWithBack
        title={`${user?.username || "loading"}님의 성경열차`}
        subtitle={`기차 수 : ${trainProfiles && trainProfiles.length}개`}
      />
      <FlexWrapperWithHeader style={{ marginBottom: "300px" }}>
        {BibleTrainProfiles}
        <CreateTrainButton onClick={() => navigate("/createTrain")}>
          성경 열차 만들기
        </CreateTrainButton>
      </FlexWrapperWithHeader>
    </>
  );
};

export default Hoc(BibleTrainProfiles, false);
