import { configureStore } from "@reduxjs/toolkit";
import { ReturnKeyType } from "react-native";
import userReducer from "./auth/authSlice";


export const store = configureStore({

    reducer : {user : userReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
