import axios from "axios";
import { getStringDate } from "../page/util/dateForm";

export const fetchBibleTracks = async (trainId) => {
  try {
    const tracks = await axios.get(`/api/bible-track/${trainId}`);
    return tracks.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
export const fetchDeleteTrack = async (trainId, date) => {
  try {
    await axios.post(
      `/api/bible-track/${trainId}/${getStringDate(date)}/deleteTrack`
    );
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const fetchCompleteTrack = async (trainId, date) => {
  try {
    await axios.post(
      `/api/bible-track/${trainId}/${getStringDate(date)}/complete`
    );
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const fetchCancelTrack = async (trainId, date) => {
  try {
    await axios.post(
      `/api/bible-track/${trainId}/${getStringDate(date)}/cancelStamp`
    );
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const fetchGetTrack = async (trainId, date) => {
  try {
    const track = await axios.get(
      `/api/bible-track/${trainId}/${getStringDate(date)}`
    );
    return track.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
