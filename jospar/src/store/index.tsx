import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import josparFormSlice from "./josparFormSlice";


export const store = configureStore({
    reducer: {
        user: userReducer,
        jospar:  josparFormSlice
    }
})
export const useAppDispatch:() => typeof store.dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
 
export default store


