import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { fetchBibleTrainJoinKey, fetchMyTrainProfile } from "../api/bibletrain";
import { role } from "../page/util/role";
import { BibleTrainState } from "../store/BibleTrainStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { FlexWrapper } from "../styledComponent/Wrapper";

export const TrainProfileUi = ({ trainProfile }) => {
  const navigate = useNavigate();
  const { trainId } = useParams();
  return (
    <FlexWrapper
      onClick={() => {
        navigate(`/train/${trainId}/${trainProfile?.userId}`);
      }}
    >
      <img
        style={{ width: "30px", height: "30px", borderRadius: "100%" }}
        src={trainProfile?.profileImage}
      ></img>
      <span style={{ fontSize: "10px" }}>
        {role[trainProfile?.role]}, {trainProfile?.nickName}
      </span>
    </FlexWrapper>
  );
};
