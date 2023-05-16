import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hoc from "../../hoc/auth";
import HeaderWithBack from "./HeaderWithBack";
import TrackList from "./TrackList";
import { useLocation } from "react-router-dom";
import Navigation from "./TrainNavigation";
import Members from "./TrainMembers";
import Setting from "./Setting";
import Analysis from "./Analysis";
import { TrainProfileUi } from "./TrainProfileUi";
import { FlexWrapperWithHeaderAndNavigation } from "../../styledComponent/Wrapper";

import {
  getBibleTrainApi,
  getBibleTrainJoinKeyApi,
  getMyTrainProfileApi,
} from "../../api/bibletrain";
import { createContext } from "react";

export const BibleTrainContext = createContext();

const BibleTrain = () => {
  const [bibleTrain, setBibleTrain] = useState({});
  const [trainProfile, setTrainProfile] = useState({});
  const navigate = useNavigate();
  const { trainId } = useParams();
  const query = useQuery();
  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    (async () => {
      await loadTrainInfo();
    })();
  }, []);

  const loadTrainInfo = async () => {
    try {
      setBibleTrain(await getBibleTrainApi(trainId));
      console.log("loading TrainInfo");
      const fetchedTrainProfile = await getMyTrainProfileApi(trainId);
      setTrainProfile(fetchedTrainProfile);
      if (fetchedTrainProfile?.role === "ROLE_CAPTAIN") {
        const fetchedTrainJoinKey = await getBibleTrainJoinKeyApi(trainId);
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
  };

  const tab = query.get("tab");
  const pop = query.get("pop");

  return (
    <BibleTrainContext.Provider
      value={{ bibleTrain, trainProfile, loadTrainInfo }}
    >
      {!pop ? (
        <>
          <HeaderWithBack
            title={bibleTrain?.trainName || ""}
            subtitle={`정원수 : ${bibleTrain?.memberCount || 0}명 - 트랙수 : ${
              bibleTrain?.trackAmount || 0
            }개`}
            path="/myBibleTrainProfiles"
            right={<TrainProfileUi />}
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
      )}
    </BibleTrainContext.Provider>
  );
};

export default Hoc(BibleTrain, false);
