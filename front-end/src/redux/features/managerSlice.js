import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCandidates = createAsyncThunk('user/getCandidates', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/candidates', {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch candidates data');
    }
});

export const getResumes = createAsyncThunk('user/getResumes', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/cvs', {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch resumes data');
    }
});

export const getRecruiters = createAsyncThunk('user/getRecruiters', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/recruiters', {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch resumes data');
    }
});

export const recruiterValidated = createAsyncThunk(
    'user/recruiterValidated',
    async (data, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post('http://localhost:5000/api/recruiters/validated', data, {
                headers: { Authorization: token },
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch resumes data');
        }
    },
);

const managerSlice = createSlice({
    name: 'manager',
    initialState: {
        isLoading: false,
        candidates: null,
        resumes: null,
        recruiters: null,
        jobs: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCandidates.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCandidates.fulfilled, (state, action) => {
                state.isLoading = false;
                state.candidates = action.payload;
                state.error = null;
            })
            .addCase(getCandidates.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            .addCase(getResumes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getResumes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.resumes = action.payload;
                state.error = null;
            })
            .addCase(getResumes.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            .addCase(getRecruiters.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRecruiters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recruiters = action.payload;
                state.error = null;
            })
            .addCase(getRecruiters.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            .addCase(recruiterValidated.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(recruiterValidated.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recruiters = action.payload;
                state.error = null;
            })
            .addCase(recruiterValidated.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export default managerSlice.reducer;
