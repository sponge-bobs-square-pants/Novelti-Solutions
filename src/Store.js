import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Features/User/UserSlice';
import countryReducer from './Features/User/CountrySlice';
export const store = configureStore({
    reducer:{
        user:userReducer,
        country:countryReducer
    }
})