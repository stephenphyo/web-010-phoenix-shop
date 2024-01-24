import { createSlice } from '@reduxjs/toolkit';

/* Initial State */
const initialState = {
    account: null,
    isAuth: false
}

/* Reducer */
const reducers = {
    login: (state, action) => {
        state.account = action.payload;
        state.isAuth = true;
    },

    logout: (state) => {
        state.account = null;
        state.isAuth = false;
    }
}

/* Slice */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: reducers
});

/* Actions */
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;