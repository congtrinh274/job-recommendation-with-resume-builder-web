import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('user/fetchJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('http://localhost:5000/api/jobs/');

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        isLoading: false,
        jobs: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.jobs = null;
                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
