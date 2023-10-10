import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }, 
        updateSaved: (state, action) => {
            state.user.saved = action.payload;
        }, 
        updateReviews: (state, action) => {
            state.user.reviews = action.payload;
        }
    },
});

export const { setLogin, setLogout, updateSaved, updateReviews } = userSlice.actions;
export const getCurrentUser = (state) => state.user.user;
export default userSlice.reducer;