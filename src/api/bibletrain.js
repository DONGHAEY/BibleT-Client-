import axios from "axios";

export const fetchBibleTrain = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrain = await axios.get(`/api/train/${trainId}`);
      resolve(bibleTrain.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchTrainProfile = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const trainProfile = await axios.get(
        `/api/train/trainProfile/${trainId}`
      );
      resolve(trainProfile.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchTrainMembers = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const trainMembers = await axios.get(
        `/api/train/${trainId}/trainMemberProfiles`
      );
      resolve(trainMembers.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchBibleTracks = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const tracks = await axios.get(`/api/bible-track/${trainId}`);
      resolve(tracks.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchDeleteBibleTrack = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/deleteTrack`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchOneBibleTrack = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrack = await axios.get(`/api/bible-track/${trainId}/${date}`);
      resolve(bibleTrack.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchCompleteTrack = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/complete`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchCancelTrack = (trainId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/bible-track/${trainId}/${date}/cancelStamp`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

// const trainProfile = await axios.get(
//   `/api/train/trainProfile/${trainId}`
// );
