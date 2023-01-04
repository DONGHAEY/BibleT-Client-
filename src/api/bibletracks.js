// **************************** bibleTracks section **************************** //

import axios from "axios";

export const getBibleTracksApi = (trainId, startDate, endDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tracks = await axios.get(
        `/api/bible-track/${trainId}/${startDate}/${endDate}`
      );
      resolve(tracks.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const deleteBibleTrackApi = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/deleteTrack`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getBibleTrackApi = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrack = await axios.get(`/api/bible-track/${trainId}/${date}`);
      resolve(bibleTrack.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const completeTrackApi = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const cancelTrackApi = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const createTrackApi = ({
  trainId,
  date,
  startChapter,
  endChapter,
  startPage,
  endPage,
  content,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/addTrack`, {
        date,
        startChapter,
        endChapter,
        startPage,
        endPage,
        content,
      });
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getOtherTracksApi = ({
  trainId,
  yearStartDateString,
  yearEndDateString,
  userId,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `/api/bible-track/${trainId}/profileOtherTrackList/${yearStartDateString}/${yearEndDateString}`,
        {
          userId,
        }
      );
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};
