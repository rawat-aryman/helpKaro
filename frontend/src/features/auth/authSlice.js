import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : '',
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {},
    extraReducers : (builder) => {}
})

// Register a new user
export const register = createAsyncThunk('auth/register' , async(user, thunkAPI) => {
    console.log(user);
})

// login user
export const login = createAsyncThunk('auth/login' , async(user, thunkAPI) => {
    console.log(user);
})

export default authSlice.reducer;