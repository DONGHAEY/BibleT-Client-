import axios from "axios";
import { useParams } from "react-router-dom";
import { role } from "./util/role";
import styled from "styled-components";
import { FlexWrapper } from "../styledComponent/Wrapper";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import { useRecoilState, useRecoilValue } from "recoil";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { useMemo, useState } from "react";
import { BibleTrainState } from "../store/BibleTrainStore";
import { useEffect } from "react";
import { fetchTrainMembers } from "../api/bibletrain";

const Members = ({ navigate }) => {
  const { trainId } = useParams();
  const train = useRecoilValue(BibleTrainState);
  const trainProfile = useRecoilValue(TrainProfileState);
  const [members, setTrainMembers] = useState([]);

  useEffect(() => {
    (async () => {
      setTrainMembers(await fetchTrainMembers(trainId));
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
            {trainProfile?.role !== "ROLE_CAPTAIN" ||
            member?.userId === trainProfile.userId ? (
              <span>{role[member?.role]}</span>
            ) : (
              <select
                style={{ border: 0 }}
                defaultValue={member?.role}
                onChange={(e) =>
                  changeRoleHandler(e.target.value, member?.userId)
                }
              >
                {roleKeys.map((roleKey, idx) => {
                  return (
                    <option key={idx} value={roleKey}>
                      {role[roleKey]}
                    </option>
                  );
                })}
              </select>
            )}
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

  const changeRoleHandler = async (roleKey, userId) => {
    console.log(trainId);
    console.log(userId);
    await axios.put(`/api/train/${trainId}/${userId}/changeRole`, {
      role: roleKey,
    });
  };

  return (
    <FlexWrapper>
      {MemberProfiles}
      {trainProfile?.role === "ROLE_CAPTAIN" ? (
        <AddCircleButton
          onClick={() => {
            const tempInput = document.createElement("input");
            tempInput.value = `http://${window.location.host}/joinTrain/${trainId}?joinKey=${train.joinKey}`;
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

export default Members;
