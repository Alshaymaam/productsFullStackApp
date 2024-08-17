import { createSlice } from "@reduxjs/toolkit";
const initialState={
isOnLine:true
}
const networkSlice=createSlice({
    name:'network',
    initialState,
    reducers:{
        networkMode:(state,action)=>{state.isOnLine=action.payload}
    }
})
export const {networkMode}=networkSlice.actions
export const selectNetwork=({network})=>network
export default networkSlice.reducer