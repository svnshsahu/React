import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false , 
    userData : null ,
}

const authSlice = createSlice({ 
    name : "auth" , 
    initialState ,
    reducers : {
        login : (state , action) => {
            state.status = true
            state.userData = action.payload.userData 
        } ,
        logout : (state) => { //hai aapke pas action ka access yaha bhi but use nahi toh nahi likh rhe
            state.status =false 
            state.userData =  null
        } 

    }
})
export const{ login , logout } = authSlice.actions;
export default authSlice.reducer;