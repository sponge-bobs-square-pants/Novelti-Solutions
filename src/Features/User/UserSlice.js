import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const initialState = {
    Current_user:localStorage.getItem('current_user') || '',
    role:localStorage.getItem('role') || '',
    isLoading: false,
    All_Users:[],
}
export const LoginUser = createAsyncThunk('user/LoginUser', async ({userId, password},thunkAPI) => {
    const url = 'https://novelti-soln-backend.onrender.com/api/v1/handleFormSubmit';
    const data = {userId, password};
    try {
        const response = await axios.post(url, data);
        const user = response.data.user
        const role = response.data.role
        // thunkAPI.dispatch(setUser({user, role}))  
        return response.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data)
    }
});
export const addUser = createAsyncThunk('user/addUser', async (newUser,thunkAPI) => {
    try {
        const response = await axios.post('https://novelti-soln-backend.onrender.com/api/v1/createUser', newUser);
        thunkAPI.dispatch(getAllUsers())
        return response.data
      } catch (error) {
          thunkAPI.rejectWithValue(error.response.data.error)
      }
});
export const getAllUsers = createAsyncThunk('user/GetAllUsers', async(thunkAPI) => {
    try {
        
        const response = await axios.get('https://novelti-soln-backend.onrender.com/api/v1/GetAllUser')
        // console.log(response.data);
        const ids = response.data.users.map((id) =>{
            return {userId:id.userId, id:id._id}
        })
        return ids
    } catch (error) {
        toast.error(error.response.data.error)
        thunkAPI.rejectWithValue(error.response.data.error)
    }
});
export const UpdateUser = createAsyncThunk('user/UpdateUser', async({Id, userId, password, role},thunkAPI) => {
    try {
      const response = await axios.patch('https://novelti-soln-backend.onrender.com/api/v1/UpdateUser',{Id, userId, password, role})
      if(response.status === 200){
        thunkAPI.dispatch(getAllUsers())
        return response.data 
      }
      
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.error)
    }
});
export const DeleteUser = createAsyncThunk('user/DeleteUser', async({Id},thunkAPI) => { 
    try {
        const response = await axios.delete('https://novelti-soln-backend.onrender.com/api/v1/deleteUser', {data:{Id}})
        if(response.status === 200){
            toast.success(`User: ${response.data.deletedUser.userId} has been deleted.`)
            thunkAPI.dispatch(getAllUsers())
            return response.data
        } 
    } catch (error) {
        toast.error(error.response.data.error)
        thunkAPI.rejectWithValue(error.response.data.error)
    }   
});
export const SubmitForm = createAsyncThunk('user/SubmitForm', async (data,thunkAPI) => {
    const {Current_user} = thunkAPI.getState().user
    const {country_list, state_list} = thunkAPI.getState().country
    const country = country_list.map((c) => {
        return c.label
    })
    const state = state_list.map((s) => {
        return s.label
    })
    const Finaldata = {
        userId:Current_user,
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        phone:data.phone,
        address1:data.address1,
        address2:data.address2,
        state:state,
        country:country,
        zipCode:data.zipCode
    }
    try {
        const response = await axios.post('https://novelti-soln-backend.onrender.com/api/v1/SubmitForm', Finaldata)
        return response.data
    } catch (error) {
        toast.error(error.response.data.error)
        thunkAPI.rejectWithValue(error.response.data.error)
    }
})
const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logout:(state) => {
            
            localStorage.setItem('current_user', '')
            localStorage.setItem('role', '')
            state.All_Users = [];
            state.Current_user = localStorage.getItem('role')
            state.role = localStorage.getItem('current_user')

        }
    },
    extraReducers: (builder) => {
        //LOGIN USER
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(LoginUser.fulfilled, (state, {payload}) => {
            state.isLoading = false
            state.Current_user = payload.user;
            state.role = payload.role;
            localStorage.setItem('current_user', payload.user);
            localStorage.setItem('role', payload.role);
            toast.success(`Welcome back ${state.Current_user}`)
            // console.log(payload.user);
        })
        builder.addCase(LoginUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })
        //ADD USER
        builder.addCase(addUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(addUser.fulfilled, (state, {payload}) => {
            toast.success(`User ${payload.user.userId} has been created sucesfully`)
            state.isLoading = false
        })
        builder.addCase(addUser.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload)
        })

        builder.addCase(getAllUsers.fulfilled, (state, {payload}) => {
            state.All_Users = payload 
        })
        builder.addCase(UpdateUser.fulfilled, (state, {payload}) => {
            toast.success('User has been edited!')
        })
        builder.addCase(SubmitForm.fulfilled, (state, {payload})=> {
            toast.success('form submitted Succesfully.Redirecting in 2 seconds')
        })
    },
})
export const {logout} = UserSlice.actions;
export default UserSlice.reducer;