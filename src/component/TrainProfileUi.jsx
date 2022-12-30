import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { role } from "../page/util/role";
import { TrainProfileState } from "../store/TrainProfileState";
import { FlexWrapper } from "../styledComponent/Wrapper";

export const TrainProfileUi = ({ trainId }) => {
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const navigate = useNavigate();
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
