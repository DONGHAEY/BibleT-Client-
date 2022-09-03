import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
    'user/register',
    async ({username, password}, {rejectWithValue}) => {
        try {
            const { data } = await axios.post(
                '/api/auth/register',
                { username, password }
              )
              return data;
        } catch(e) {
            if(e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message);
            } else {
                return rejectWithValue(e.message)
            }
        }
    }
)