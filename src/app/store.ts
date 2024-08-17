import{configureStore} from"@reduxjs/toolkit"
import LoginSlice from "./features/LoginSlice"
import cartSlice from "./features/cartSlice"
import globalSlice from "./features/globalSlice"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { apiSlice } from "./services/ApiSlice"
import networkSlice from "./features/networkSlice"

const persistCartConfig={
    key:"cart",
    storage
}
const persistCart=persistReducer(persistCartConfig,cartSlice)
export const store=configureStore({
    reducer:{
        login:LoginSlice,
        cart:persistCart,
        global:globalSlice,
        network:networkSlice,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false,}).concat([apiSlice.middleware])
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persister=persistStore(store)
