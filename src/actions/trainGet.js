import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const trainGet = createAsyncThunk(
  "train/trainGet",
  async ({ trainId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/train/${trainId}`);
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
