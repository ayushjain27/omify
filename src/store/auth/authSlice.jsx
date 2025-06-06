import { createSlice } from '@reduxjs/toolkit';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  // isStoreLoading: false,
  // sendOtp: []
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(sendOtpApi.pending, (state) => {
    //     state.isStoreLoading = true;
    //     state.sendOtp = [];
    //   })
      // You can add more cases like this:
      // .addCase(sendOtpApi.fulfilled, (state, action) => {
      //   state.isStoreLoading = false;
      //   state.sendOtp = action.payload;
      // })
      // .addCase(sendOtpApi.rejected, (state) => {
      //   state.isStoreLoading = false;
      // })
  }
});

export const { actions } = slice;
export const authActions = slice.actions;

export default slice.reducer;