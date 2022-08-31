import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const userLogout = createAsyncThunk(
    'user/logout',
    async (d, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('/api/auth/logout');
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