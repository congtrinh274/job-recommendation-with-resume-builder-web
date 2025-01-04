import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyEmail = createAsyncThunk('user/verifyEmail', async ({ data }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/api/recruiters/send-verification-code', data, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

export const verifiedEmail = createAsyncThunk('user/verifiedEmail', async ({ data }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/api/recruiters/verified-code', data, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
    }
});

export const fetRecruiter = createAsyncThunk('candidate/fetRecruiter', async (_, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/recruiters/get-one', {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch candidate data');
    }
});

export const updateRecruiter = createAsyncThunk(
    'user/updateRecruiter',
    async ({ updateData }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.put('http://localhost:5000/api/recruiters/update', updateData, {
                headers: { Authorization: token },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
        }
    },
);

export const uploadLicense = createAsyncThunk(
    'candidate/uploadLicense',
    async ({ data }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.put(`http://localhost:5000/api/recruiters/upload-license`, data, {
                headers: { Authorization: token },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Lỗi tải lên file');
        }
    },
);

export const uploadImg = createAsyncThunk('candidate/uploadImg', async ({ data }, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.put(`http://localhost:5000/api/recruiters/upload-img`, data, {
            headers: { Authorization: token },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Lỗi tải lên ảnh');
    }
});

export const fetchCategoryJobs = createAsyncThunk('jobCategory/fetchCategoryJobs', async () => {
    const response = await axios.get('http://localhost:5000/api/job-categories');
    return response.data.data;
});

export const createJob = createAsyncThunk('jobCategory/createJob', async (jobData, { rejectWithValue, getState }) => {
    try {
        const { auth } = getState();
        const token = auth?.token;

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post('http://localhost:5000/api/jobs/create', jobData, {
            headers: { Authorization: token },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const changeApplicationState = createAsyncThunk(
    'jobCategory/changeApplicationState',
    async ({ state, jobId }, { rejectWithValue, getState }) => {
        console.log(state);
        try {
            const { auth } = getState();
            const token = auth?.token;

            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(
                `http://localhost:5000/api/jobs/change-application-state/${jobId}`,
                { state },
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

const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState: {
        isLoading: false,
        data: null,
        categories: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            .addCase(verifiedEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifiedEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(verifiedEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })
            // ----
            .addCase(updateRecruiter.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateRecruiter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateRecruiter.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            // -----

            .addCase(fetRecruiter.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetRecruiter.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetRecruiter.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            // -----

            .addCase(uploadLicense.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadLicense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(uploadLicense.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            // -----

            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.data = null;
                state.error = action.payload;
            })

            // Fetch categories
            .addCase(fetchCategoryJobs.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategoryJobs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(fetchCategoryJobs.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = null;
                state.error = action.payload;
            })

            // Create job
            .addCase(createJob.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.data?.postedJobs) {
                    state.data.postedJobs.push(action.payload.data);
                } else {
                    state.data = { postedJobs: [action.payload.data] };
                }
                state.error = null;
            })
            .addCase(createJob.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // change application state
            .addCase(changeApplicationState.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changeApplicationState.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(changeApplicationState.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default recruiterSlice.reducer;
