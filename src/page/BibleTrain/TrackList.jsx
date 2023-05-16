import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CreateTrack from "./CreateTrack";
import { AddCircleButton } from "../../styledComponent/AddCircleButton";
import { TrackInfo } from "./TrackInfo";
import { useEffect } from "react";
import {
  getBibleTracksApi,
  cancelTrackApi,
  completeTrackApi,
  deleteBibleTrackApi,
  getBibleTrackApi,
} from "../../api/bibletracks";
import { getStringDate, getWeek } from "../../util/dateForm";
import { getTrainMembersApi } from "../../api/bibletrain";
import { BibleTrainContext } from "./BibleTrain";

const TrackList = () => {
  const { trainProfile, loadTrainInfo } = useContext(BibleTrainContext);
  const [bibleTracks, setTracks] = useState([]);
  const [trainMembers, setTrainMembers] = useState([]);
  const [stdDate, setStdDate] = useState(new Date());
  const [popup, handlePopup] = useState(false);

  const { trainId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await loadTracksData();
    })();
  }, [stdDate]);

  /** 해당하는 기간에 맞게 트랙리스트를 불러온다 */
  const loadTracksData = async () => {
    try {
      const { startDate, endDate } = getWeek(stdDate);
      setTrainMembers(await getTrainMembersApi(trainId));
      setTracks(await getBibleTracksApi(trainId, startDate, endDate));
    } catch (e) {
      alert(e);
      navigate(-1);
    }
  };

  /** 한개의 트랙만 업데이트 시킨다 */
  const updateTrack = async (date) => {
    const data = await getBibleTrackApi(trainId, date);
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
      await deleteBibleTrackApi(trainId, date);
      //2. 응답이 잘 되었다면, 모든 리스트를 다시 불러오기보다
      //3. 현재 배열에서 하나를 예외 시킨다.
      await deleteTrack(date);
      // 기차정보를 새로 불러온다.
      await loadTrainInfo();
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
        await completeTrackApi(trainId, date);
      } else {
        // 트랙을 완료 취소한다.
        await cancelTrackApi(trainId, date);
      }
      //2. 작업이 완료된 트랙 하나를 업데이트한다.
      await updateTrack(date);
    } catch (e) {
      alert(e);
      e.target.checked = false;
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
          {before.startDate} ~ {before.endDate} 저번주
        </PageMoveBtn>
        {bibleTracks.length ? (
          bibleTracks?.map((track, i) => (
            <TrackInfo
              key={i}
              track={track}
              trainMembers={trainMembers}
              checkTrackHandler={checkHandler}
              deleteTrackHandler={deleteHandler}
            />
          ))
        ) : (
          <NoTrackDiv>
            <IMG src={"/png/checkList.png"}></IMG>
            <h3>트랙이 아무것도 없습니다</h3>
          </NoTrackDiv>
        )}
        <PageMoveBtn
          onClick={() =>
            setStdDate((prev) => new Date(prev.setDate(prev.getDate() + 7)))
          }
        >
          {after.startDate} ~ {after.endDate} 다음주
        </PageMoveBtn>
      </TrackListMain>
      {popup && (
        <CreateTrack onClose={handlePopup} loadTracksData={loadTracksData} />
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
