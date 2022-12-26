import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Hoc from "../HOC/auth";
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
    axios
      .get(`/api/train/${trainId}`)
      .then((res) => {
        setTrain(res.data);
      })
      .catch((e) => {
        alert("잘못된접근");
      });
  }, []);

  return (
    <HeaderWithBack /> &&
    train && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          onClick={() => {
            axios
              .post(`/api/train/${trainId}/join`, {
                joinKey,
                nickName,
              })
              .then((response) => {
                alert(response.data);
                navigate("/myBibleTrainProfiles");
              })
              .catch((e) => {
                alert(e.response.data.message);
                navigate(-1);
              });
          }}
        >
          등록하기
        </button>
      </div>
    )
  );
};

export default Hoc(JoinTrain);
