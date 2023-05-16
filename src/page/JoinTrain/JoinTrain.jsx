import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getBibleTrainApi, joinTrainApi } from "../../api/bibletrain";
import Hoc from "../../hoc/auth";
import { FlexWrapper } from "../../styledComponent/Wrapper";
import HeaderWithBack from "../BibleTrain/HeaderWithBack";

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
        setTrain(await getBibleTrainApi(trainId));
      } catch (e) {
        alert("잘못된 접근");
      }
    })();
  }, []);

  return (
    <HeaderWithBack /> &&
    train && (
      <FlexWrapper
        style={{
          display: "flex",
          height: "500px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: "35px" }}>성경열차 가입</span>
        <span style={{ fontSize: "50px" }}>{train.trainName}</span>
        <p>아래에 인증키와 기차에서의 닉네임을 입력하세요</p>
        <br></br>
        <input
          style={{
            margin: "5px",
            border: "1px solid black",
            width: "300px",
            padding: "5px",
            height: "30px",
          }}
          value={joinKey}
          onChange={(e) => setJoinKey(e.target.value)}
          placeholder="인증키"
        ></input>
        <input
          style={{
            margin: "5px",
            border: "1px solid black",
            padding: "5px",
            width: "300px",
            height: "30px",
          }}
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="닉네임"
        ></input>
        <button
          style={{
            width: "310px",
            height: "40px",
          }}
          onClick={async () => {
            try {
              await joinTrainApi(trainId, joinKey, nickName);
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
