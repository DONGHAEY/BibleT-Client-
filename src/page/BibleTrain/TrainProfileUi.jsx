import { useNavigate, useParams } from "react-router-dom";
import { role } from "../../util/role";
import { FlexWrapper } from "../../styledComponent/Wrapper";
import { useContext } from "react";
import { BibleTrainContext } from "./BibleTrain";

export const TrainProfileUi = () => {
  const { trainProfile } = useContext(BibleTrainContext);
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
