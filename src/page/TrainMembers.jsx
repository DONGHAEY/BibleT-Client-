import axios from "axios";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { role } from "./util/role";
import { IoMdExit } from "@react-icons/all-files/io/IoMdExit";
import styled from "styled-components";
import { FlexWrapper } from "../styledComponent/Wrapper";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { HiOutlineUserAdd } from "@react-icons/all-files/hi/HiOutlineUserAdd";
import { useRecoilState } from "recoil";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { useMemo } from "react";

const Members = ({ train, navigate }) => {
  const { trainId } = useParams();
  const [members, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);

  const MemberProfiles = useMemo(() => {
    return (
      members.length &&
      members.map((member, memIdx) => {
        const roleKeys = Object.keys(role);
        console.log(member);
        return (
          <MemberDiv
            key={memIdx}
            onClick={() => {
              navigate(`/train/${member?.trainId}/${member?.userId}`);
            }}
          >
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
                <select defaultValue={member?.role}>
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
            <div>{member?.checkStamps.length}번</div>
          </MemberDiv>
        );
      })
    );
  }, [members]);

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
