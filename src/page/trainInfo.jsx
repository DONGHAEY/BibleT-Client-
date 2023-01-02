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
  fetchBibleTrainJoinKey,
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
        const fetchedTrainProfile = await fetchTrainProfile(trainId);
        setTrainProfile(fetchedTrainProfile);
        if (fetchedTrainProfile?.role === "ROLE_CAPTAIN") {
          const fetchedTrainJoinKey = await fetchBibleTrainJoinKey(trainId);
          setBibleTrain((trainInfo) => {
            return {
              ...trainInfo,
              joinKey: fetchedTrainJoinKey,
            };
          });
        }
        setTrainMembers(await fetchTrainMembers(trainId));
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  const trainProfileUi = <TrainProfileUi trainId={trainId} />;

  return query.get("pop") === null ? (
    <>
      {bibleTrain ? (
        <HeaderWithBack
          title={bibleTrain?.trainName || "loading"}
          subtitle={`정원수 : ${bibleTrain?.memberCount || 0}명 - 트랙수 : ${
            bibleTrain?.trackAmount || 0
          }개`}
          path="/myBibleTrainProfiles"
          right={trainProfileUi}
        />
      ) : null}
      <FlexWrapperWithHeaderAndNavigation>
        {query.get("tab") === null ? <TrackList /> : null}
        {query.get("tab") === "members" ? (
          <Members navigate={navigate} />
        ) : null}
        {query.get("tab") === "setting" ? (
          <Setting
            trainId={trainId}
            goback={() => navigate("/myBibleTrainProfiles")}
          />
        ) : null}
        <Navigation />
      </FlexWrapperWithHeaderAndNavigation>
    </>
  ) : query.get("pop") === "analysis" ? (
    <Analysis trainId={trainId} />
  ) : null;
};

export default Hoc(TrainInfo);
