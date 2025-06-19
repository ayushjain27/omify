import { createSlice } from '@reduxjs/toolkit';
import { getAllUserDataApi, getUserDataByUserNameApi } from './authApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  // isStoreLoading: false,
  // sendOtp: []
  selectedUserDetails: {},
  allUserData: []
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataByUserNameApi.fulfilled, (state, action) => {
      state.selectedUserDetails = action.payload;
    });
    builder.addCase(getAllUserDataApi.fulfilled, (state, action) => {
      state.allUserData = action.payload;
    });
  }
});

export const { actions } = slice;
export const authActions = slice.actions;

export default slice.reducer;
