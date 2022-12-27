import axios from "axios";
import { useEffect, useMemo, useState } from "react";
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
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { BibleTrainState } from "../store/BibleTrainStore";
import { TrainMembersState } from "../store/TrainMembersStore";
import { TrainProfileState } from "../store/TrainProfileState";
import { BibleTracksState } from "../store/BibleTracksState";
import {
  fetchBibleTrain,
  fetchTrainMembers,
  fetchTrainProfile,
} from "../api/bibletrain";
import { getWeek } from "./util/dateForm";

const TrainInfo = () => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);
  const [trainMembers, setTrainMembers] = useRecoilState(TrainMembersState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const [bibleTracks, setBibleTracks] = useRecoilState(BibleTracksState);

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
        setBibleTrain(await fetchBibleTrain(trainId));
        setTrainProfile(await fetchTrainProfile(trainId));
        setTrainMembers(await fetchTrainMembers(trainId));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

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
            <TrackList />
          </>
        ) : null}
        {query.get("tab") === "members" ? (
          <Members
            train={bibleTrain}
            trainProfile={trainProfile}
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

export default Hoc(TrainInfo);
