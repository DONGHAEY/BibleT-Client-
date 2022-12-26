import axios from "axios";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../HOC/auth";
import CreateTrack from "./trainInfo/createTrack";
import { getStringDate, 요일 } from "./util/dateForm";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { TrackInfo } from "../component/TrackInfo";

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
  const [popup, handlePopup] = useState({
    createTrack: false,
    trackDetail: false,
  });

  const { trainId } = useParams();

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

  const checkTrackHandler = useCallback(async (e, date, idx) => {
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

  const trackComponents = tracks?.map((track, i) => {
    return (
      <TrackInfo
        key={i}
        members={members}
        track={track}
        checkTrackHandler={checkTrackHandler}
        deleteTrackHandler={deleteTrackHandler}
        trainProfile={trainProfile}
        i={i}
      />
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
  position: relative;
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
