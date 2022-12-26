import axios from "axios";
import { getStringDate } from "../page/util/dateForm";

export const fetchTrainProfile = async (trainId) => {
  const trainProfile = await axios.get(`/api/train/trainProfile/${trainId}`);
  return trainProfile.data;
};

export const fetchBibleTrain = async (trainId) => {
  const train = await axios.get(`/api/train/${trainId}`);
  return train.data;
};

export const fetchTrainMembers = async (trainId) => {
  const trainMembers = await axios.get(
    `/api/train/${trainId}/trainMemberProfiles`
  );
  return trainMembers.data;
};
