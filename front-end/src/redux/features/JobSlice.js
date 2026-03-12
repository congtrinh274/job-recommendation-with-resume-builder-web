import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('user/fetchJobs', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/`);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

export const getActiveJob = createAsyncThunk('user/getActiveJob', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/get-active-jobs`);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

export const getJobById = createAsyncThunk('user/getJobById', async (jobId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/get-one/${jobId}`);

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

export const approveJob = createAsyncThunk(
    'jobs/approveJob',
    async ({ jobId, recruiterId, approvedState, cancelReason }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/jobs/approved/${jobId}`,
                {
                    recruiterId,
                    approvedState,
                    cancelReason,
                },
                { headers: { Authorization: token } },
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to approving job post!');
        }
    },
);

export const applyJob = createAsyncThunk(
    'jobs/applyJob',
    async ({ jobId, cvId, appliedLetter, fullName, email, phone }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/jobs/apply/${jobId}`,
                {
                    cvId,
                    appliedLetter,
                    fullName,
                    email,
                    phone,
                },
                { headers: { Authorization: token } },
            );

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to apply for job');
        }
    },
);

export const updateApplicationListState = createAsyncThunk(
    'jobCategory/updateApplicationListState',
    async ({ jobId, cvId, newStatus, responseLetter }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/jobs/update-application-state`,
                { jobId, cvId, newStatus, responseLetter },
                {
                    headers: { Authorization: token },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        isLoading: false,
        jobs: null,
        currentJob: null,
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
            })

            .addCase(getActiveJob.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getActiveJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(getActiveJob.rejected, (state, action) => {
                state.isLoading = false;
                state.jobs = null;
                state.error = action.payload;
            })

            .addCase(approveJob.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(approveJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.jobs = action.payload.data;
                state.error = null;
            })
            .addCase(approveJob.rejected, (state, action) => {
                state.isLoading = false;
                state.jobs = null;
                state.error = action.payload;
            })

            .addCase(getJobById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentJob = action.payload;
                state.error = null;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.isLoading = false;
                state.currentJob = null;
                state.error = action.payload;
            })

            .addCase(applyJob.pending, (state) => {
                state.isLoading = true;
                state.applicationStatus = null;
                state.error = null;
            })
            .addCase(applyJob.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentJob = action.payload;
                state.error = null;
            })
            .addCase(applyJob.rejected, (state, action) => {
                state.isLoading = false;
                state.applicationStatus = 'failed';
                state.error = action.payload;
            })

            // update application list state
            .addCase(updateApplicationListState.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateApplicationListState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentJob = action.payload;
                state.error = null;
            })
            .addCase(updateApplicationListState.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default jobSlice.reducer;
