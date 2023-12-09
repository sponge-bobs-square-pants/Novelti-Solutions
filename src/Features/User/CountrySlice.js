import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const initialState = {
    country_list:[],
    state_list:[],

}

const CountrySlice = createSlice({
    name:'country',
    initialState,
    reducers:{
        setCountry: (state, action) => {
            state.country_list = action.payload
        },
        setState: (state, action) => {
            state.state_list = action.payload
        }
    },
})

export const {setCountry, setState} = CountrySlice.actions;
export default CountrySlice.reducer;