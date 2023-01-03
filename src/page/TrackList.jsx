import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTrackDiv from "../component/CreateTrack";
import { AddCircleButton } from "../styledComponent/AddCircleButton";
import { TrackInfo } from "../component/TrackInfo";
import { BibleTrainState } from "../store/BibleTrainStore";
import { useRecoilState } from "recoil";
import { TrainProfileState } from "../store/TrainProfileState";
import { BibleTracksState } from "../store/BibleTracksState";
import { useEffect } from "react";
import {
  fetchBibleTracks,
  fetchCancelTrack,
  fetchCompleteTrack,
  fetchDeleteBibleTrack,
  fetchOneBibleTrack,
  fetchTrainMembers,
} from "../api/bibletrain";
import { getWeek } from "./util/dateForm";
import { TrainMembersState } from "../store/TrainMembersStore";

const TrackList = () => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);

  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);

  const [bibleTracks, setTracks] = useRecoilState(BibleTracksState);

  const [stdDate, setStdDate] = useState(new Date());

  const [popup, handlePopup] = useState(false);

  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);

  const { trainId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setTrainMembers(await fetchTrainMembers(trainId));
      await loadTracksData();
    })();
  }, [stdDate]);

  /** 해당하는 기간에 맞게 트랙리스트를 불러온다 */
  const loadTracksData = async () => {
    try {
      const { startDate, endDate } = getWeek(stdDate);
      setTracks(await fetchBibleTracks(trainId, startDate, endDate));
    } catch (e) {
      alert(e);
      navigate(-1);
    }
  };

  /** 한개의 트랙만 업데이트 시킨다 */
  const updateTrack = async (date) => {
    const data = await fetchOneBibleTrack(trainId, date);
    setTracks((oldTracks) => {
      const newTracks = [];
      for (let i = 0; i < oldTracks.length; i++) {
        const oldTrack = oldTracks[i];
        if (oldTrack.date === date) {
          newTracks[i] = data;
        } else {
          newTracks[i] = oldTrack;
        }
      }
      return newTracks;
    });
  };

  /** 한개의 트랙만 트랙 배열에서 제외시킨다. */
  const deleteTrack = async (date) => {
    setTracks((oldTracks) => {
      return oldTracks.filter((oldTrack) => oldTrack.date !== date);
    });
  };

  /** 트랙 하나를 지울 때 실행 */
  const deleteHandler = async (date) => {
    try {
      //1. 트랙을 지우라고 서버에 요청한다.
      await fetchDeleteBibleTrack(trainId, date);
      //2. 응답이 잘 되었다면, 모든 리스트를 다시 불러오기보다
      //3. 현재 배열에서 하나를 예외 시킨다.
      await deleteTrack(date);
      //3. 열차정보에서 트랙수를 하나 낮추어 표시 한다.
      setBibleTrain((prevTrain) => {
        const newBibleTrain = {
          ...prevTrain,
          trackAmount: prevTrain.trackAmount - 1,
        };
        return newBibleTrain;
      });
    } catch (e) {
      alert(e);
    }
  };

  /** 트랙을 완료하거나 취소 할 때 실행 */
  const checkHandler = async (e, date) => {
    try {
      //1. 트랙을 현재 체크상태에 따라 완료 또는 취소를 서버에 요청한다.
      if (e.target.checked) {
        // 트랙을 완료한다
        await fetchCompleteTrack(trainId, date);
      } else {
        // 트랙을 완료 취소한다.
        await fetchCancelTrack(trainId, date);
      }
      //2. 작업이 완료된 트랙 하나를 업데이트한다.
      await updateTrack(date);
    } catch (e) {
      alert(e);
    }
  };

  const before = getWeek(
    new Date(new Date(stdDate).setDate(new Date(stdDate).getDate() - 7))
  );
  const after = getWeek(
    new Date(new Date(stdDate).setDate(new Date(stdDate).getDate() + 7))
  );

  return (
    <>
      <TrackListMain>
        {trainProfile?.role === "ROLE_CAPTAIN" && (
          <AddCircleButton onClick={() => handlePopup(true)}>+</AddCircleButton>
        )}
        <PageMoveBtn
          style={{ marginTop: 0 }}
          onClick={() =>
            setStdDate((prev) => new Date(prev.setDate(prev.getDate() - 7)))
          }
        >
          {before.startDate} ~ {before.endDate}
        </PageMoveBtn>
        {bibleTracks.length ? (
          bibleTracks?.map((track, i) => {
            return (
              <TrackInfo
                key={i}
                track={track}
                checkTrackHandler={checkHandler}
                deleteTrackHandler={deleteHandler}
              />
            );
          })
        ) : (
          <NoTrackDiv>
            <IMG src={"/png/checkList.png"}></IMG>
            <h3>트랙이 아무것도 없네요..</h3>
          </NoTrackDiv>
        )}

        <PageMoveBtn
          onClick={() =>
            setStdDate((prev) => new Date(prev.setDate(prev.getDate() + 7)))
          }
        >
          {after.startDate} ~ {after.endDate}
        </PageMoveBtn>
      </TrackListMain>

      {popup && (
        <CreateTrackDiv onClose={handlePopup} loadTracksData={loadTracksData} />
      )}
    </>
  );
};

const NoTrackDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const IMG = styled.img`
  width: 150px;
  margin-bottom: 15px;
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
