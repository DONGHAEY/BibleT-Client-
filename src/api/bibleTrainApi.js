import axios from "axios";
import { getStringDate } from "../page/util/dateForm";

export const fetchTrainProfile = async (trainId) => {
  try {
    const trainProfile = await axios.get(`/api/train/trainProfile/${trainId}`);
    return trainProfile.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const fetchBibleTrain = async (trainId) => {
  try {
    const bibleTrain = await axios.get(`/api/train/${trainId}`);
    return bibleTrain.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};

export const fetchTrainMembers = async (trainId) => {
  try {
    const trainMembers = await axios.get(
      `/api/train/${trainId}/trainMemberProfiles`
    );
    return trainMembers.data;
  } catch (e) {
    throw new Error(e.response.data.message);
  }
};
