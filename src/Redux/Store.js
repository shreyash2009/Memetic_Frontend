import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './Features/authSlice'
import MemeReducer from './Features/memeSlice'



export default configureStore({
    reducer:{
        auth:AuthReducer,
        meme: MemeReducer
    }
})