import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTrack from "./CreateTrack";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { TrackInfo } from "../component/TrackInfo";
import { BibleTrainState } from "../store/BibleTrainStore";
import { useRecoilState } from "recoil";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { BibleTracksState } from "../store/BibleTracksState";
import axios from "axios";
import { useEffect } from "react";
import {
  fetchBibleTracks,
  fetchCancelTrack,
  fetchCompleteTrack,
  fetchDeleteBibleTrack,
  fetchTrainProfile,
} from "../api/bibletrain";

const TrackList = ({}) => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);
  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const [bibleTracks, setTracks] = useRecoilState(BibleTracksState);
  const [popup, handlePopup] = useState({
    createTrack: false,
    trackDetail: false,
  });

  const { trainId } = useParams();

  useEffect(() => {
    (async () => {
      await fetchAndSetTracks();
    })();
  }, []);

  const deleteTrackHandler = async (date, idx) => {
    try {
      await fetchDeleteBibleTrack(trainId, date);
      setBibleTrain((prevTrain) => {
        const newBibleTrain = {
          ...prevTrain,
          trackAmount: prevTrain["trackAmount"] - 1,
        };
        return newBibleTrain;
      });
      fetchAndSetTracks();
    } catch (e) {
      alert(e);
    }
  };

  const checkTrackHandler = async (e, date, idx) => {
    try {
      if (e.target.checked) {
        await fetchCompleteTrack(trainId, date);
      } else {
        await fetchCancelTrack(trainId, date);
      }
      setTrainProfile(await fetchTrainProfile(trainId));
      fetchAndSetTracks();
    } catch (e) {
      alert(e);
    }
  };

  const addOneTrack = async (date) => {
    try {
      setBibleTrain((prevTrain) => {
        const newTrain = {
          ...prevTrain,
          trackAmount: prevTrain["trackAmount"] + 1,
        };
        return newTrain;
      });
      fetchAndSetTracks();
    } catch (e) {
      alert(e);
    }
  };

  const fetchAndSetTracks = async () => {
    try {
      setTracks(await fetchBibleTracks(trainId));
    } catch (e) {
      alert(e);
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
