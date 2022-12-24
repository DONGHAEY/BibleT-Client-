import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const TrackDetail = () => {
  const { trainId, trackDate } = useParams();
  const [track, setTrack] = useState(null);

  useEffect(() => {
    axios.get(`/api/bible-track/${trainId}/${trackDate}`).then(({ data }) => {
      setTrack(data);
    });
  }, []);

  return (
    <div>
      <h1>이곳은 Track을 자세히 보여주는 곳 입니다.</h1>
    </div>
  );
};

export default TrackDetail;
