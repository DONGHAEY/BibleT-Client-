import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Hoc from "../HOC/auth";
import CreateTrack from "./trainInfo/createTrack";
import bibleData from "./util/bible";
import HeaderWithBack from "./HeaderWithBack";
import { role } from "./util/role";
import TrackList from "./TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./TrainNavigation";
import Members from "./TrainMembers";
import Setting from "./trainInfo/Setting";
import Analysis from "./trainInfo/analysis";
import {
  FlexWrapper,
  FlexWrapperWithHeader,
  WrapperWithHeader,
} from "../styledComponent/Wrapper";

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

  const trainProfileUi = (
    <FlexWrapper
      onClick={() => {
        navigate(`/train/${trainId}/${trainProfile?.userId}`);
      }}
    >
      <img
        style={{ width: "30px", height: "30px", borderRadius: "100%" }}
        src={trainProfile?.profileImage}
      ></img>
      <span style={{ fontSize: "10px" }}>
        {role[trainProfile?.role]}, {trainProfile?.nickName}
      </span>
    </FlexWrapper>
  );

  return query.get("pop") === null ? (
    <>
      {train ? (
        <HeaderWithBack
          title={train?.trainName}
          subtitle={`정원수 : ${train?.memberCount}명 - 트랙수 : ${train?.trackAmount}개`}
          path="/myBibleTrainProfiles"
          right={trainProfileUi}
        />
      ) : null}
      <FlexWrapperWithHeader
        style={{
          marginBottom: "90px",
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {query.get("tab") === null ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                left: 0,
                top: 0,
                backgroundColor: "whitesmoke",
                height: "100%",
                width: "10px",
                color: "black",
                cursor: "pointer",
              }}
            ></div>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                right: 0,
                top: 0,
                width: "10px",
                backgroundColor: "whitesmoke",
                height: "100%",
                color: "black",
                cursor: "pointer",
              }}
            ></div>
          </>
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
            goback={() => navigate("/myBibleTrainProfiles")}
            trainProfile={trainProfile}
          />
        ) : null}
        <Navigation />
      </FlexWrapperWithHeader>
    </>
  ) : query.get("pop") === "analysis" ? (
    train &&
    members && <Analysis train={train} trainId={trainId} members={members} />
  ) : null;
};

export default Hoc(TrainInfo);
