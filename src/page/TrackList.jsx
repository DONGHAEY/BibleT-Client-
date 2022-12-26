import axios from "axios";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTrack from "./CreateTrack";
import { getStringDate } from "./util/dateForm";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { TrackInfo } from "../component/TrackInfo";
import { BibleTrainState } from "../store/BibleTrainStore";
import { useRecoilState } from "recoil";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { BibleTracksState } from "../store/BibleTracksState";
import {
  fetchCancelTrack,
  fetchCompleteTrack,
  fetchDeleteTrack,
  fetchGetTrack,
} from "../api/bibleTrackApi";
import { fetchTrainProfile } from "../api/bibleTrainApi";

const TrackList = ({ updateBibleTrain, updateMembers }) => {
  const [bibleTrain] = useRecoilState(BibleTrainState);
  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const [bibleTracks, setTracks] = useRecoilState(BibleTracksState);
  const [popup, handlePopup] = useState({
    createTrack: false,
    trackDetail: false,
  });

  const { trainId } = useParams();

  const deleteTrackHandler = async (date, idx) => {
    try {
      await fetchDeleteTrack(trainId, date);
      updateBibleTrain();
      setTracks((oldTracks) => {
        return oldTracks.filter((track, i) => i !== idx);
      });
      updateMembers();
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const checkTrackHandler = async (e, date, idx) => {
    try {
      if (e.target.checked) {
        await fetchCompleteTrack(trainId, date);
      } else {
        await fetchCancelTrack(trainId, date);
      }
      await updateOneTrack(date, idx);
      const updatedMyProfile = await fetchTrainProfile(trainId);
      setTrainProfile(updatedMyProfile);
      setTrainMembers((members) => {
        //굳이 요청하지 않아도 되는 메서드 잘 정리하기 그리고 이 메서드는 Members컴포넌트에서 가져와야 편리하다
        return trainMembers.map((member) => {
          if (member.userId === updatedMyProfile.data.userId) {
            return updatedMyProfile.data;
          }
          return member;
        });
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const updateOneTrack = async (date, idx) => {
    const { data } = await fetchGetTrack(trainId, date);
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
  };

  const addOneTrack = async (date) => {
    try {
      updateBibleTrain();
      const trackInfo = await fetchGetTrack(trainId, date);
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
  };

  const trackComponents = bibleTracks?.map((track, i) => {
    return (
      <TrackInfo
        key={i}
        members={trainMembers}
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
        {bibleTracks.length ? trackComponents : NoTracks}
      </TrackListMain>
      {popup.createTrack ? (
        <CreateTrack
          onClose={handlePopup}
          train={bibleTrain}
          addOne={addOneTrack}
        />
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

const TrackListMain = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export default TrackList;
