import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { trainGet } from '../actions/trainGet';
import { trainProfileGet } from '../actions/trainProfileGet';

export const trainSlice = createSlice({
    name: "Train",
    initialState:{
        loading: false,
        trainInfo : null,
        trainProfile : null,
        members : null,
        tracks : null,
        error:null,
    },
    reducers : {

    },
    extraReducers : {
        [trainGet.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [trainGet.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.trainInfo = payload
        },
        [trainGet.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        [trainProfileGet.pending]: (state) => {
            state.trainProfile = true
            state.error = null
        },
        [trainProfileGet.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.trainInfo = payload
        },
        [trainProfileGet.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})


export const selectTrainInfo = (state) => state.train.trainInfo;
export const selectMembers = (state) => state.train.members;
export const selectTracks = (state) => state.train.tracks;

export default trainSlice.reducer;