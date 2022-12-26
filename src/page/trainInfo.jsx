import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hoc from "../HOC/auth";
import HeaderWithBack from "./HeaderWithBack";
import { role } from "./util/role";
import TrackList from "./TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./TrainNavigation";
import Members from "./TrainMembers";
import Setting from "./Setting";
import Analysis from "./Analysis";
import { TrainProfileUi } from "../component/TrainProfileUi";
import { FlexWrapperWithHeaderAndNavigation } from "../styledComponent/Wrapper";
import { getWeek } from "./util/dateForm";

const TrainInfo = () => {
  const [bibleTrain, setBibleTrain] = useState(null);
  const [trainProfile, setTrainProfile] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(0);
  const [date, setDate] = useState({});

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
        setDate(getWeek(page));
        setBibleTrain(await fetchBibleTrain());
        setTrainProfile(await fetchTrainProfile());
        setTracks(await fetchTracks());
        setMembers(await fetchMembers());
      } catch (e) {
        alert(e.response.data.message);
      }
    })();
  }, [page]);

  const fetchTrainProfile = useCallback(async (trainId) => {
    const trainProfile = await axios.get(`/api/train/trainProfile/${trainId}`);
    return trainProfile.data;
  });

  const fetchBibleTrain = useCallback(async (trainId) => {
    const train = await axios.get(`/api/train/${trainId}`);
    return train.data;
  });

  const fetchTracks = useCallback(async (trainId) => {
    const tracks = await axios.get(`/api/bible-track/${trainId}`);
    return tracks.data;
  });

  const fetchMembers = useCallback(async (trainId) => {
    const res = await axios.get(`/api/train/${trainId}/trainMemberProfiles`);
    return res.data;
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
            <TrackList
              members={members}
              tracks={tracks}
              train={bibleTrain}
              trainProfile={trainProfile}
              setTrainProfile={setTrainProfile}
              setTrain={setBibleTrain}
              setTracks={setTracks}
              setMembers={setMembers}
              fetchMembers={fetchMembers}
              setPage={setPage}
            />
          </>
        ) : null}
        {query.get("tab") === "members" ? (
          <Members
            train={bibleTrain}
            trainProfile={trainProfile}
            members={members}
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
    members && (
      <Analysis train={bibleTrain} trainId={trainId} members={members} />
    )
  ) : null;
};

export default Hoc(TrainInfo);
