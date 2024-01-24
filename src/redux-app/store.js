import { configureStore } from '@reduxjs/toolkit';

/* Slice Imports ***/
import AuthSlice from './slices/AuthSlice';

/*** API Imports ***/
import { AuthAPI } from './apis/AuthAPI';
import { ProfileAPI } from './apis/ProfileAPI';

export const store = configureStore({
    reducer: {

        /* Slices */
        auth: AuthSlice,

        /* APIs */
        [AuthAPI.reducerPath]: AuthAPI.reducer,
        [ProfileAPI.reducerPath]: ProfileAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            AuthAPI.middleware,
            ProfileAPI.middleware,
        ]),
});