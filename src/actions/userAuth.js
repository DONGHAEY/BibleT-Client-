import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const userAuth = createAsyncThunk(
    'user/authenticate',
    async (actions, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          '/api/auth/authenticate',
        )
        return data;
      } catch (error) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )