import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login-success', payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const persistedState = JSON.parse(localStorage.getItem('persist:root'));
        const token = JSON.parse(persistedState.auth).token;

        await axios.post(
            'http://localhost:5000/api/auth/logout',
            {},
            {
                headers: { Authorization: token },
            },
        );

        return true;
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
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSignedIn = false;
                state.token = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.msg || 'Logout failed';
            });
    },
});

export default authSlice.reducer;
