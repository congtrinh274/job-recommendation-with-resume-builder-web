import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login-success`, payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isSignedIn: false,
        token: null,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
            state.isSignedIn = false;
            state.token = null;
            state.error = null;

            localStorage.removeItem('persist:root');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSignedIn = true;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isSignedIn = false;
                state.token = null;
                state.error = action.payload.msg || 'Login failed';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
