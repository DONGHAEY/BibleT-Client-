import axios from "axios";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../../HOC/auth";
import CreateTrack from "./createTrack";
import { MdCancel } from "@react-icons/all-files/md/MdCancel";
import bibleData from "../util/bible";
import { role } from "../util/role";
import { useLocation } from "react-router-dom";
import { getStringDate, 요일 } from "../util/dateForm";
import { AddCircleButton } from "../../styledComponent/AddCircleButton";

const bible = bibleData();

const TrackList = ({
  tracks,
  train,
  trainProfile,
  setTrainProfile,
  setTrain,
  setTracks,
  members,
  setMembers,
}) => {
  const navigate = useNavigate();
  const [popup, handlePopup] = useState({
    createTrack: false,
    trackDetail: false,
  });

  const { trainId } = useParams();

  const ProfileOne = ({ mem }) => {
    const [show, setShow] = useState(false);
    return (
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <img
          style={{ width: "15px", height: "15px", borderRadius: "100%" }}
          src={mem && mem.profileImage}
        ></img>
        <span style={{ fontSize: "10px", display: show ? "inline" : "none" }}>
          {mem && mem.nickName}
        </span>
      </span>
    );
  };

  const deleteTrackHandler = useCallback(async (date, idx) => {
    try {
      await axios.post(
        `/api/bible-track/${trainId}/${getStringDate(date)}/deleteTrack`
      );
      const trainInfo = await axios.get(`/api/train/${trainId}`);
      setTrain(trainInfo.data);
      setTracks((oldTracks) => {
        return oldTracks.filter((track, i) => i !== idx);
      });
      const membersInfo = await axios.get(
        `/api/train/${trainId}/trainMemberProfiles`
      );
      setMembers(membersInfo.data);
    } catch (e) {
      alert(e.response.data.message);
    }
  }, []);

  const checkHandler = useCallback(async (e, date, idx) => {
    try {
      if (e.target.checked) {
        await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
      } else {
        await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
      }
      await updateOneTrack(date, idx);
      const updatedUser = await axios.get(`/api/train/trainProfile/${trainId}`);
      setTrainProfile(updatedUser.data);
      setMembers((members) => {
        //굳이 요청하지 않아도 되는 메서드 잘 정리하기 그리고 이 메서드는 Members컴포넌트에서 가져와야 편리하다
        return members.map((member) => {
          if (member.userId === updatedUser.data.userId) {
            return updatedUser.data;
          }
          return member;
        });
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }, []);

  const updateOneTrack = useCallback(async (date, idx) => {
    const { data } = await axios.get(`/api/bible-track/${trainId}/${date}`);
    setTracks((oldTracks) => {
      const newArray = [];
      for (let i = 0; i < oldTracks.length; i++) {
        const oldNote = oldTracks[i];
        if (i === idx) {
          newArray[i] = data;
        } else {
          newArray[i] = oldNote;
        }
      }
      return newArray;
    });
  }, []);

  const addOneTrack = useCallback(async (date) => {
    try {
      const trainInfo = await axios.get(`/api/train/${trainId}`);
      setTrain(trainInfo.data);
      const trackInfo = await axios.get(
        `/api/bible-track/${trainId}/${getStringDate(date)}`
      );
      setTracks((oldTracks) => {
        const newArray = [...oldTracks];
        newArray.push(trackInfo.data);
        newArray.sort(function (a, b) {
          if (a.date < b.date) return 1;
          if (a.date === b.date) return 0;
          if (a.date > b.date) return -1;
        });
        return newArray;
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  }, []);

  const 오늘 = new Date();

  const trackComponents = tracks?.map((track, i) => {
    const dateString = track.date.split("-");
    const trackDate = new Date(
      parseInt(dateString[0]),
      parseInt(dateString[1]) - 1,
      parseInt(dateString[2])
    );

    return (
      <TrackDiv key={track.date}>
        <h3 style={{ padding: "10px" }}>
          {trackDate.getFullYear()}년 {trackDate.getMonth() + 1}월{" "}
          {trackDate.getDate()}일 ({요일[trackDate.getDay()]}){" "}
          {오늘.toLocaleDateString() === trackDate.toLocaleDateString() &&
            "오늘"}
        </h3>
        <h3>
          {bible[track.startChapter - 1].chapter} {track.startPage}장 -{" "}
          {bible[track.endChapter - 1].chapter} {track.endPage}장
        </h3>
        <p style={{ paddingInline: "3%", paddingBlock: "5px" }}>
          {track.content}
        </p>
        <div>
          <span style={{ padding: "5px" }}>
            총 {track.checkStamps.length}명 완료
          </span>
          {track.checkStamps.map((stamp, idx) => {
            const mem = members.find(
              (member) => member.userId === stamp.userId
            );
            // console.log(`${stamp.trackDate}/${idx}`);
            return <ProfileOne key={`${stamp.trackDate}/${idx}`} mem={mem} />;
          })}
        </div>
        <div style={{ padding: "3px" }}>
          <span style={{ padding: "5px" }}>
            {track.status === "COMPLETE" ? "완료" : "미완료"}
          </span>
          <input
            style={{ padding: "5px" }}
            type="checkbox"
            checked={track.status === "COMPLETE" ? true : false}
            onClick={async (e) => await checkHandler(e, `${track.date}`, i)}
          ></input>
        </div>
        <DeleteButton
          show={trainProfile.role === "ROLE_CAPTAIN"}
          key={`${track.date}/xBtn`}
        >
          <MdCancel
            key={`${track.date}/xIcon`}
            onClick={() => deleteTrackHandler(trackDate, i)}
          />
        </DeleteButton>
      </TrackDiv>
    );
  });

  return (
    <>
      <TrackListMain>
        {trainProfile?.role === "ROLE_CAPTAIN" ? (
          <AddCircleButton
            onClick={() =>
              handlePopup({
                createTrack: true,
              })
            }
          >
            +
          </AddCircleButton>
        ) : null}
        {tracks.length ? trackComponents : NoTracks}
      </TrackListMain>
      {popup.createTrack ? (
        <CreateTrack onClose={handlePopup} train={train} addOne={addOneTrack} />
      ) : null}
    </>
  );
};

const NoTracks = (
  <div style={{ marginTop: "100px", textAlign: "center" }}>
    <img style={{ width: "150px" }} src={"/png/checkList.png"}></img>
    <h3 style={{ marginTop: "20px" }}>트랙이 아무것도 없네요..</h3>
  </div>
);

const TrackDiv = styled.div`
  position: relative;
  margin-top: 15px;
  text-align: center;
  width: 95%;
  height: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
`;

const TrackListMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const DeleteButton = styled.div`
  display:${({ show }) => (show ? "block;" : "none;")}
  top: 2px;
  right: 2px;
  position: absolute;
  cursor: pointer;
`;

export default TrackList;
