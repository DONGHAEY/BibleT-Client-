import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { role } from "../util/role";
import { IoMdExit } from "@react-icons/all-files/io/IoMdExit";
// IoExit

const Members = ({ train, members, navigate, trainProfile }) => {
  const { trainId } = useParams();
  const MemberProfiles = members.map((member, memIdx) => {
    return (
      <div
        key={memIdx}
        style={{
          width: "90%",
          backgroundColor: "rgba(250, 250, 250, 0.9)",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          marginBlock: "15px",
        }}
        onClick={() => {
          navigate(`/train/${member.trainId}/${member.userId}`);
        }}
      >
        <img
          src={member.profileImage}
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
        ></img>
        <span style={{ fontSize: "15px", width: "100px" }}>
          <span style={{ fontWeight: "bold" }}>{member.nickName}</span>
          <br></br>
          <span>{role[member.role]}</span>
        </span>
        <div>{member.checkStamps.length}번</div>
      </div>
    );
  });

  return (
    trainProfile && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <button
          style={{
            backgroundColor: "black",
            width: "130px",
            height: "30px",
            borderRadius: "5px",
            border: 0,
            color: "white",
            marginTop: "30px",
            marginBottom: "30px",
          }}
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
          멤버 추가하기
        </button>
        {MemberProfiles}
      </div>
    )
  );
};

export default Members;
