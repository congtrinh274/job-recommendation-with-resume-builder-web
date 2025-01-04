import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCandidate = createAsyncThunk('candidate/fetchCandidate', async (_, { rejectWithValue, getState }) => {
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

export const getCVById = createAsyncThunk('candidate/getCVById', async ({ cvId }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:5000/api/cvs/get-cv/${cvId}`, {
            headers: {
                Authorization: token,
            },
        });

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch CV');
    }
});

export const createCV = createAsyncThunk('candidate/createCV', async ({ cvData }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/api/cvs/add-cv', cvData, {
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

        const response = await axios.put(`http://localhost:5000/api/cvs/upload-cv`, cvData, {
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
                const value = updateData[key];
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            const response = await axios.put(`http://localhost:5000/api/cvs/update-cv/${cvId}`, formData, {
                headers: {
                    Authorization: token,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update CV');
        }
    },
);

export const deleteCV = createAsyncThunk('candidate/deleteCV', async ({ cvId }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.delete(`http://localhost:5000/api/cvs/delete-cv/${cvId}`, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete CV');
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
            .addCase(fetchCandidate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCandidate.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchCandidate.rejected, (state, action) => {
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
            })

            .addCase(getCVById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCVById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentCV = action.payload;
            })
            .addCase(getCVById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteCV.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCV.fulfilled, (state, action) => {
                state.isLoading = false;

                if (state.data?.cvs) {
                    state.data = action.payload.data;
                }

                state.error = null;
            })
            .addCase(deleteCV.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCandidateData } = candidateSlice.actions;
export default candidateSlice.reducer;
