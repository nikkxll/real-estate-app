import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  message: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
        state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    signUpStart: (state) => {
        state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    signUpFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
  },
});

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    signUpStart,
    signUpSuccess,
    signUpFailure } = userSlice.actions

export default userSlice.reducer;