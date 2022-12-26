import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hoc from "../HOC/auth";
import HeaderWithBack from "./HeaderWithBack";
import TrackList from "./TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./TrainNavigation";
import Members from "./TrainMembers";
import Setting from "./Setting";
import Analysis from "./Analysis";
import { TrainProfileUi } from "../component/TrainProfileUi";
import { FlexWrapperWithHeaderAndNavigation } from "../styledComponent/Wrapper";
import { getWeek } from "./util/dateForm";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { BibleTrainState } from "../store/BibleTrainStore";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { BibleTracksState } from "../store/BibleTracksState";

const TrainInfo = () => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);
  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const [bibleTracks, setBibleTracks] = useRecoilState(BibleTracksState);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState(null);

  const navigate = useNavigate();
  const query = useQuery();
  const { trainId } = useParams();

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    (async () => {
      try {
        // setDate(getWeek(page));
        await updateBibleTrain();
        await updateTrainProfile();
        await updateTrainMembers();
        await updateTracks();
      } catch (e) {
        alert(e);
      }
    })();
  }, [page]);

  const updateBibleTrain = async () => {
    const bibleTrain = await axios.get(`/api/train/${trainId}`);
    setBibleTrain(bibleTrain.data);
  };
  const updateTrainProfile = async () => {
    const trainProfile = await axios.get(`/api/train/trainProfile/${trainId}`);
    setTrainProfile(trainProfile.data);
  };
  const updateTracks = async () => {
    const tracks = await axios.get(`/api/bible-track/${trainId}`);
    setBibleTracks(tracks.data);
  };
  const updateTrainMembers = async () => {
    const trainMembers = await axios.get(
      `/api/train/${trainId}/trainMemberProfiles`
    );
    setTrainMembers(trainMembers.data);
  };

  const trainProfileUi = (
    <TrainProfileUi trainId={trainId} trainProfile={trainProfile} />
  );

  return query.get("pop") === null ? (
    <>
      {bibleTrain ? (
        <HeaderWithBack
          title={bibleTrain?.trainName}
          subtitle={`정원수 : ${bibleTrain?.memberCount}명 - 트랙수 : ${bibleTrain?.trackAmount}개`}
          path="/myBibleTrainProfiles"
          right={trainProfileUi}
        />
      ) : null}
      <FlexWrapperWithHeaderAndNavigation>
        {query.get("tab") === null ? (
          <>
            {bibleTrain?.trackAmount ? (
              <PageMoveBtn onClick={() => setPage((prev) => prev - 1)}>
                저번주로
              </PageMoveBtn>
            ) : null}
            <TrackList
              updateBibleTrain={updateBibleTrain}
              updateMembers={updateTrainMembers}
            />
            {bibleTrain?.trackAmount ? (
              <PageMoveBtn onClick={() => setPage((prev) => prev + 1)}>
                다음주로
              </PageMoveBtn>
            ) : null}
          </>
        ) : null}
        {query.get("tab") === "members" ? (
          <Members
            train={bibleTrain}
            trainProfile={trainProfile}
            members={trainMembers}
            navigate={navigate}
          />
        ) : null}
        {query.get("tab") === "setting" ? (
          <Setting
            trainId={trainId}
            goback={() => navigate("/myBibleTrainProfiles")}
            trainProfile={trainProfile}
          />
        ) : null}
        <Navigation />
      </FlexWrapperWithHeaderAndNavigation>
    </>
  ) : query.get("pop") === "analysis" ? (
    bibleTrain &&
    trainMembers && (
      <Analysis train={bibleTrain} trainId={trainId} members={trainMembers} />
    )
  ) : null;
};

const PageMoveBtn = styled.div`
  width: 95%;
  background-color: whitesmoke;
  margin-top: 15px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 5px;
`;

export default Hoc(TrainInfo);
