import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import trainReducer from "../features/trainSlice";


export default configureStore({
    reducer: {
        user : userReducer,
        train : trainReducer
    }
})