import axios from "axios";

// **************************** train section **************************** //

export const getBibleTrainApi = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrain = await axios.get(`/api/train/${trainId}`);
      resolve(bibleTrain.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getBibleTrainJoinKeyApi = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bibleTrain = await axios.get(`/api/train/${trainId}/getJoinKey`);
      resolve(bibleTrain.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getTrainMembersApi = (trainId) => {
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

export const getOffTrainApi = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/api/train/${trainId}/exit`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const createTrainApi = ({ trainName, churchName, captainName }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post("/api/train/create", {
        trainName,
        churchName,
        captainName,
      });
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const deleteTrainApi = (trainId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.delete(`/api/train/${trainId}`);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const joinTrainApi = (trainId, joinKey, nickName) => {
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

// **************************** trainProfiles section **************************** //

export const trainProfilesApi = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const trainProfiles = await axios.post("/api/train/trainProfiles");
      resolve(trainProfiles.data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getOtherTrainProfileApi = (trainId, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`/api/train/${trainId}/${userId}`);
      resolve(data);
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const changeTrainProfileImgApi = (trainId, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.post(`/api/train/${trainId}/changeMyProfileImg`, formData);
      resolve();
    } catch (e) {
      reject(e.response.data.message);
    }
  });
};

export const getMyTrainProfileApi = (trainId) => {
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
