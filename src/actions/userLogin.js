import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          '/api/auth/login',
          { username, password }
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