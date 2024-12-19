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

export const createCV = createAsyncThunk('candidate/createCV', async ({ cvData }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/api/candidates/add-cv', cvData, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create new CV');
    }
});

export const uploadCV = createAsyncThunk('candidate/uploadCV', async ({ cvData }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:5000/api/candidates/upload-cv`, cvData, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update candidate CVs');
    }
});

export const updateCV = createAsyncThunk(
    'candidate/updateCV',
    async ({ cvId, updateData, file }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            Object.keys(updateData).forEach((key) => {
                formData.append(key, updateData[key]);
            });

            const response = await axios.put(`http://localhost:5000/api/candidates/update-cv/${cvId}`, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update CV');
        }
    },
);

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
            })
            .addCase(uploadCV.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadCV.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = {
                    ...state.data,
                    ...action.payload,
                };
                state.error = null;
            })
            .addCase(uploadCV.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createCV.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCV.fulfilled, (state, action) => {
                state.isLoading = false;

                if (state.data?.cvs) {
                    state.data.cvs.push(action.payload.data);
                } else {
                    state.data = { cvs: [action.payload.data] };
                }

                state.error = null;
            })
            .addCase(createCV.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateCV.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCV.fulfilled, (state, action) => {
                state.isLoading = false;

                const updatedCV = action.payload.data;
                if (state.data?.cvs) {
                    const index = state.data.cvs.findIndex((cv) => cv._id === updatedCV._id);
                    if (index !== -1) {
                        state.data.cvs[index] = updatedCV;
                    }
                }

                state.error = null;
            })
            .addCase(updateCV.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCandidateData } = candidateSlice.actions;
export default candidateSlice.reducer;
