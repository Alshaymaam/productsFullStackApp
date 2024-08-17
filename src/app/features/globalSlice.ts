import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isOpenCartDrawer:false,
    onCloseCartDrawer:false,
    onOpenCartDrawer:false
}
const globelSlice=createSlice({
    name:'global',
    initialState,
    reducers:{
        onOpenCartDrawerAction:(state)=>{state.onOpenCartDrawer=true;state.isOpenCartDrawer=true},
        onCloseCartDrawerAction:(state)=>{state.onCloseCartDrawer=false;state.isOpenCartDrawer=false}
    }
})
export const {onCloseCartDrawerAction,onOpenCartDrawerAction}=globelSlice.actions
export const selectGlobal=({global})=>global
export default globelSlice.reducer