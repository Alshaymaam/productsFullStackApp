import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axios.config";
import { createStandaloneToast } from "@chakra-ui/react";
import cookieService from "../../services/cookies.ts"

export interface IinitialState{
    loading:boolean;
    data:string|null;
    error:string|null
}
const initialState: IinitialState={
    loading:false,
    data:null,
    error:null
    
};
const {toast}=createStandaloneToast()
export const userLogin = createAsyncThunk("login/userLogin",async(user,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI;
    try {
        const {data}=await axiosInstance.post(`/api/auth/local`,user)
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})
const loginSlice=createSlice({
    name:'login',
    initialState,
    reducers: {}, 
 extraReducers:builder=>{
    builder.addCase(userLogin.pending,(state)=>{state.loading=true});
    builder.addCase(userLogin.fulfilled,(state,action)=>{
        state.loading=false;
        state.data=action.payload;
        state.error=null;
        const date=new Date();
        const IN_DAYS=3;
        const EXPIRES_IN_DAYS=1000*60*60*24*IN_DAYS
        date.setTime(date.getDate()+EXPIRES_IN_DAYS)
        const options={path:'/',expires:date}
        cookieService.set("jwt",action.payload.jwt,options)
        toast({
            title: 'Loginned successfully',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        });
    builder.addCase(userLogin.rejected,(state,action)=>{
        state.loading=false;
        state.data=null;
        if (typeof action.payload === 'string' || action.payload === null) {state.error = action.payload;}
         else { state.error = 'An unknown error occurred'; }
        toast({
            title: `${(action.payload as { response: { data: { error: { message: string } } } }).response.data.error.message}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })})
 }
});

export const selectLogin = ({login}) =>login;
export default loginSlice.reducer;