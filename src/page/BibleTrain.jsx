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
import { useRecoilState } from "recoil";
import { BibleTrainState } from "../store/BibleTrainStore";
import {
  fetchBibleTrain,
  fetchBibleTrainJoinKey,
  fetchMyTrainProfile,
} from "../api/bibletrain";
import { TrainProfileState } from "../store/TrainProfileState";

const BibleTrain = () => {
  const [bibleTrain, setBibleTrain] = useRecoilState(BibleTrainState);
  const [trainProfile, setTrainProfile] = useRecoilState(TrainProfileState);
  const navigate = useNavigate();
  const { trainId } = useParams();
  const query = useQuery();
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    (async () => {
      try {
        setBibleTrain(await fetchBibleTrain(trainId));
        const fetchedTrainProfile = await fetchMyTrainProfile(trainId);
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
      } catch (e) {
        alert(e);
        navigate(-1);
      }
    })();
  }, []);

  const tab = query.get("tab");
  const pop = query.get("pop");

  return !pop ? (
    <>
      <HeaderWithBack
        title={bibleTrain?.trainName || "loading"}
        subtitle={`정원수 : ${bibleTrain?.memberCount || 0}명 - 트랙수 : ${
          bibleTrain?.trackAmount || 0
        }개`}
        path="/myBibleTrainProfiles"
        right={<TrainProfileUi trainProfile={trainProfile} />}
      />
      <FlexWrapperWithHeaderAndNavigation>
        {!tab && <TrackList />}
        {tab === "members" && <Members />}
        {tab === "setting" && (
          <Setting goback={() => navigate("/myBibleTrainProfiles")} />
        )}
        <Navigation />
      </FlexWrapperWithHeaderAndNavigation>
    </>
  ) : (
    pop === "analysis" && <Analysis trainId={trainId} />
  );
};

export default Hoc(BibleTrain);
