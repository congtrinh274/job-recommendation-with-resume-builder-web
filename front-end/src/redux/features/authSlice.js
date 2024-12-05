// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isSignedIn: false,
        token: null,
        error: false,
    },

    reducers: {},
});

export default authSlice.reducer;
