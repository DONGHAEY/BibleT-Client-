import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const userLogin = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          '/api/auth/login',
          { username, password }
        )
        localStorage.setItem('userToken', data.token)
        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )


export const userSlice = createSlice({
    name: "User",

    initialState:{
        loading: false,
        user: null,
        userToken : null,
        error: null,
        success: false,
    },

    reducers : {
        // login : async (state, action) => {
        //     try {
        //         const res =  await axios.post("/api/auth/login", {
        //             username:action.payload.username,
        //             password : action.payload.password
        //         }, {withCredentials : true});
        //         const res2 =  await axios.post("/api/auth/authenticate", {withCredentials : true});
        //         state.user = res2.data;
        //     } catch(e) {
        //         console.log(e);
        //     }
        // },
        // logout : (state, action) => {
        //     state.user = null;
        // }
    },
    extraReducers : {
        [userLogin.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.user = payload.user
            state.userToken = payload.token
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})


export const selectUser = (state) => state.user.user;

export default userSlice.reducer;