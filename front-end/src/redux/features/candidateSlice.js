import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetCandidate = createAsyncThunk('candidate/fetchCandidate', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/candidates/get-one', {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch candidate data');
    }
});

const candidateSlice = createSlice({
    name: 'candidate',
    initialState: {
        isLoading: false,
        data: null,
        error: null,
    },
    reducers: {
        clearCandidateData: (state) => {
            state.data = null;
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetCandidate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetCandidate.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const { clearCandidateData } = candidateSlice.actions;
export default candidateSlice.reducer;
