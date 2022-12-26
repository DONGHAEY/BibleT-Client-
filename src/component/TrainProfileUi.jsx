import { useNavigate } from "react-router-dom";
import { role } from "../page/util/role";
import { FlexWrapper } from "../styledComponent/Wrapper";

export const TrainProfileUi = ({ trainId, trainProfile }) => {
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
