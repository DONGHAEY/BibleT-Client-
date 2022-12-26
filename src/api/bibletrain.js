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
