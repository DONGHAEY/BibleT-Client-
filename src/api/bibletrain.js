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

export const fetchBibleTrainJoinKey = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrain = await axios.get(`/api/train/${trainId}/getJoinKey`);
      resolve(bibleTrain.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const fetchMyTrainProfile = (trainId) => {
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

export const fetchBibleTracks = (trainId, startDate, endDate) => {
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

export const getOffTrain = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/api/train/${trainId}/exit`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};
export const deleteTrain = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/api/train/${trainId}`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getOtherTrainProfile = (trainId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/train/${trainId}/${userId}`);
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const changeTrainProfileImg = (trainId, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/train/${trainId}/changeMyProfileImg`, formData);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const joinTrain = (trainId, joinKey, nickName) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/train/${trainId}/join`, {
        joinKey,
        nickName,
      });
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};
