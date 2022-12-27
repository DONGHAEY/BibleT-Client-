import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTrackDiv from "./CreateTrack";
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
import { getWeek } from "./util/dateForm";

const TrackList = ({}) => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);
  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const [bibleTracks, setTracks] = useRecoilState(BibleTracksState);
  const [stdDate, setStdDate] = useState(new Date());
  const [popup, handlePopup] = useState({
    createTrack: false,
    trackDetail: false,
  });

  const { trainId } = useParams();

  useEffect(() => {
    (async () => {
      const t = getWeek(stdDate);
      await fetchAndSetTracks(t.startDate, t.endDate);
    })();
  }, [stdDate, popup.createTrack]);

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
      const t = getWeek(stdDate);
      fetchAndSetTracks(t.startDate, t.endDate);
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
      const t = getWeek(stdDate);
      fetchAndSetTracks(t.startDate, t.endDate);
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
      const { startDate, endDate } = getWeek(stdDate);
      fetchAndSetTracks(startDate, endDate);
    } catch (e) {
      alert(e);
    }
  };

  const fetchAndSetTracks = async (startDate, endDate) => {
    try {
      console.log(startDate, endDate);
      setTracks(await fetchBibleTracks(trainId, startDate, endDate));
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
        {bibleTrain?.trackAmount ? (
          <PageMoveBtn
            style={{ marginTop: 0 }}
            onClick={() =>
              setStdDate((prev) => new Date(prev.setDate(prev.getDate() - 7)))
            }
          >
            저번주로
          </PageMoveBtn>
        ) : null}
        {bibleTracks.length ? trackComponents : NoTracks}
        {bibleTrain?.trackAmount ? (
          <PageMoveBtn
            onClick={() =>
              setStdDate((prev) => new Date(prev.setDate(prev.getDate() + 7)))
            }
          >
            다음주로
          </PageMoveBtn>
        ) : null}
      </TrackListMain>

      {popup.createTrack ? (
        <CreateTrackDiv
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

const PageMoveBtn = styled.div`
  width: 95%;
  background-color: whitesmoke;
  margin-top: 15px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-size: 5px;
`;

export default TrackList;
