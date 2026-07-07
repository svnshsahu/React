import {configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice"
const store = configureStore({
    reducer :{
     auth : AuthSlice ,  
     //todo : add more slice here for post 
    }
})

export default store