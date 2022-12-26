import axios from "axios";
import { getStringDate } from "../page/util/dateForm";

export const fetchBibleTracks = async (trainId) => {
  try {
    const tracks = await axios.get(`/api/bible-track/${trainId}`);
    return tracks.data;
  } catch (e) {
    console.log("트랙들 가져오기 실패");
    alert(e);
  }
};
export const fetchDeleteTrack = async (trainId, date) => {
  try {
    await axios.post(`/api/bible-track/${trainId}/${date}/deleteTrack`);
  } catch (e) {
    console.log("트랙 삭제하기 실패");
    alert(e);
  }
};

export const fetchCompleteTrack = async (trainId, date) => {
  try {
    await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
  } catch (e) {
    console.log("완료하기 실패");
    alert(e);
  }
};

export const fetchCancelTrack = async (trainId, date) => {
  try {
    await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
  } catch (e) {
    console.log("취소하기 실패");
    alert(e);
  }
};

export const fetchGetTrack = async (trainId, date) => {
  try {
    const track = await axios.get(`/api/bible-track/${trainId}/${date}`);
    return track.data;
  } catch (e) {
    console.log("트랙 가져오기 에러");
    alert(e);
  }
};
