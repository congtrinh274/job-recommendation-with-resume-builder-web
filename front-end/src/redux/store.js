import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['isSignedIn', 'token'],
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
});

export const store = configureStore({
    reducer: {
        rootReducer,
    },
});

export const persistor = persistStore(store);
