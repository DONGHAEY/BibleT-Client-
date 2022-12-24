import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../../HOC/auth";
import CreateTrack from "./createTrack";
import bibleData from "../util/bible";
import HeaderWithBack from "../HeaderWithBack";
import { role } from "../util/role";
import TrackList from "./TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Members from "./Members";
import Setting from "./Setting";
import Analysis from "./analysis";

const bible = bibleData();

const TrainInfo = () => {
  const [train, setTrain] = useState(null);
  const [trainProfile, setTrainProfile] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [members, setMembers] = useState([]);
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
        const train = await axios.get(`/api/train/${trainId}`);
        setTrain(train.data);

        const trainProfile = await axios.get(
          `/api/train/trainProfile/${trainId}`
        );
        setTrainProfile(trainProfile.data);

        const tracks = await axios.get(`/api/bible-track/${trainId}`);
        setTracks(tracks.data);
        const trainMembers = await axios.get(
          `/api/train/${trainId}/trainMemberProfiles`
        );
        setMembers(trainMembers.data);
      } catch (e) {
        alert(e.response.data.message);
        navigate("/userTrainProfiles");
      }
    })();
  }, []);

  const fetchMembers = useCallback(() => {
    axios.get(`/api/train/${trainId}/trainMemberProfiles`).then((res) => {
      setMembers(res.data);
    });
  }, []);

  const trainProfileUi = trainProfile ? (
    <Container
      onClick={() => {
        navigate(`/train/${trainId}/${trainProfile.userId}`);
      }}
    >
      <img
        style={{ width: "30px", height: "30px", borderRadius: "100%" }}
        src={trainProfile.profileImage}
      ></img>
      <span style={{ fontSize: "10px" }}>
        {role[trainProfile.role]}, {trainProfile.nickName}
      </span>
    </Container>
  ) : null;

  return query.get("pop") === null ? (
    <div>
      <HeaderWithBack
        title={train?.trainName}
        subtitle={`정원수 : ${train?.memberCount}명 - 트랙수 : ${train?.trackAmount}개`}
        path="/userTrainProfiles"
        right={trainProfileUi}
      />
      <Container2>
        {query.get("tab") === null ? (
          <TrackList
            members={members}
            tracks={tracks}
            train={train}
            trainProfile={trainProfile}
            setTrainProfile={setTrainProfile}
            setTrain={setTrain}
            setTracks={setTracks}
            setMembers={setMembers}
            fetchMembers={fetchMembers}
          />
        ) : null}
        {query.get("tab") === "members" ? (
          <Members
            train={train}
            trainProfile={trainProfile}
            members={members}
            navigate={navigate}
          />
        ) : null}
        {query.get("tab") === "setting" ? (
          <Setting
            trainId={trainId}
            goback={() => navigate("/userTrainProfiles")}
            trainProfile={trainProfile}
          />
        ) : null}
        <Navigation />
      </Container2>
    </div>
  ) : query.get("pop") === "analysis" ? (
    train &&
    members && <Analysis train={train} trainId={trainId} members={members} />
  ) : null;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
  text-align: center;
  margin-right: 30px;
`;

const Container2 = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 90px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 100px;
`;

export default Hoc(TrainInfo);
