import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./chatSlice"

const store = configureStore({
         reducer : {
         user: userReducer
         }
})

export default store;