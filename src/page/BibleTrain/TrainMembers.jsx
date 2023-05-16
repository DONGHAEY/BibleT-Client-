import { useNavigate, useParams } from "react-router-dom";
import { role } from "../../util/role";
import styled from "styled-components";
import { FlexWrapper } from "../../styledComponent/Wrapper";
import { AddCircleButton } from "../../styledComponent/AddCircleButton";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import { memo, useMemo, useState } from "react";
import { useEffect } from "react";
import { getTrainMembersApi } from "../../api/bibletrain";
import { BibleTrainContext } from "./BibleTrain";
import { useContext } from "react";
import axios from "axios";

const TrainMembers = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();

  const { trainProfile, bibleTrain } = useContext(BibleTrainContext);
  const [members, setTrainMembers] = useState([]);

  useEffect(() => {
    (async () => {
      setTrainMembers(await getTrainMembersApi(trainId));
    })();
  }, []);

  const MemberProfiles = useMemo(() => {
    return members?.map((member, memIdx) => {
      const roleKeys = Object.keys(role);
      return (
        <MemberDiv key={memIdx}>
          <img
            src={member?.profileImage}
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          ></img>
          <span style={{ fontSize: "15px", width: "100px" }}>
            <span style={{ fontWeight: "bold" }}>{member?.nickName}</span>
            <br></br>

            <span>{role[member?.role]}</span>
          </span>
          <div>
            <p>{member?.completeCount}번</p>
            <p
              onClick={() => {
                navigate(`/train/${member?.trainId}/${member?.userId}`);
              }}
              style={{
                fontSize: "1.3vh",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              자세히보기
            </p>
          </div>
        </MemberDiv>
      );
    });
  }, [members]);

  return (
    <FlexWrapper>
      {MemberProfiles}
      {trainProfile?.role === "ROLE_CAPTAIN" ? (
        <AddCircleButton
          onClick={async () => {
            const tempInput = document.createElement("input");
            const { data } = await axios.get(
              `/api/train/${trainId}/getJoinKey`
            );
            tempInput.value = `http://${window.location.host}/joinTrain/${trainId}?joinKey=${data.joinKey}`;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            alert("초대링크가 복사되었습니다");
          }}
        >
          <HiOutlineUserAdd size={25} />
        </AddCircleButton>
      ) : null}
    </FlexWrapper>
  );
};

const MemberDiv = styled.div`
  width: 90%;
  background-color: rgba(250, 250, 250, 0.9);
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-block: 15px;
`;

export default memo(TrainMembers);
