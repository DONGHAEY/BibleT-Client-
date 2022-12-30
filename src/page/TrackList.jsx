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
import trainInfo from "./trainInfo";

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
      await fetchAndSetTracks();
    })();
  }, [stdDate]);

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
      const t = getWeek(stdDate);
      fetchAndSetTracks();
    } catch (e) {
      alert(e);
    }
  };

  const fetchAndSetTracks = async () => {
    try {
      const { startDate, endDate } = getWeek(stdDate);
      setTracks(await fetchBibleTracks(trainId, startDate, endDate));
    } catch (e) {
      alert(e);
    }
  };

  const trackComponents = bibleTracks?.map((track, i) => {
    return (
      <TrackInfo
        key={i}
        track={track}
        checkTrackHandler={checkTrackHandler}
        deleteTrackHandler={deleteTrackHandler}
        trainProfile={trainProfile}
        i={i}
      />
    );
  });
  const before = getWeek(new Date(stdDate.setDate(stdDate.getDate() - 7)));
  const after = getWeek(new Date(stdDate.setDate(stdDate.getDate() + 7)));
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
        <PageMoveBtn
          style={{ marginTop: 0 }}
          onClick={() =>
            setStdDate((prev) => new Date(prev.setDate(prev.getDate() - 7)))
          }
        >
          {before.startDate} ~ {before.endDate}
        </PageMoveBtn>
        {bibleTracks.length ? trackComponents : NoTracks}

        <PageMoveBtn
          onClick={() =>
            setStdDate((prev) => new Date(prev.setDate(prev.getDate() + 7)))
          }
        >
          {after.startDate} ~ {after.endDate}
        </PageMoveBtn>
      </TrackListMain>

      {popup.createTrack ? (
        <CreateTrackDiv
          onClose={handlePopup}
          train={bibleTrain}
          fetchAndSetTracks={fetchAndSetTracks}
        />
      ) : null}
    </>
  );
};

const NoTracks = (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "30px",
      marginBottom: "15px",
    }}
  >
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
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  margin-top: 15px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
`;

export default TrackList;
