import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const trainProfileGet = createAsyncThunk(
  "train/trainGet",
  async ({ trainId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/train/trainProfile/${trainId}`);
      const tracks = await axios.get(`/api/bible-track/${trainId}`);
      const members = await axios.get(
        `/api/train/${trainId}/trainMemberProfiles`
      );

      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
