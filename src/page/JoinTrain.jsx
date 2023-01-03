import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchBibleTrain, joinTrain } from "../api/bibletrain";
import Hoc from "../HOC/auth";
import { FlexWrapper } from "../styledComponent/Wrapper";
import HeaderWithBack from "./HeaderWithBack";

const JoinTrain = () => {
  const query = useQuery();
  const [joinKey, setJoinKey] = useState(query.get("joinKey") || "");
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();
  const { trainId } = useParams();
  const [train, setTrain] = useState();

  function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }

  useEffect(() => {
    (async () => {
      try {
        setTrain(await fetchBibleTrain(trainId));
      } catch (e) {
        alert("잘못된 접근");
      }
    })();
  }, []);

  return (
    <HeaderWithBack /> &&
    train && (
      <FlexWrapper>
        <h1>#{train.id}번</h1>
        <h3>{train.trainName}기차에 가입하시려면</h3>
        <p>이곳에 인증키와 기차에서 보여질 이름을 입력하세요</p>
        <input
          style={{ marginInline: "5px" }}
          value={joinKey}
          onChange={(e) => setJoinKey(e.target.value)}
          placeholder="인증키"
        ></input>
        <input
          style={{ marginInline: "5px" }}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="보여질이름"
        ></input>
        <button
          onClick={async () => {
            try {
              await joinTrain(trainId, joinKey, nickName);
              navigate("/myBibleTrainProfiles");
            } catch (e) {
              alert(e.response.data.message);
              navigate(-1);
            }
          }}
        >
          탑승하기
        </button>
      </FlexWrapper>
    )
  );
};

export default Hoc(JoinTrain);
