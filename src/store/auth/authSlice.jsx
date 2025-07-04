import { createSlice } from '@reduxjs/toolkit';
import { getAllUserCountsApi, getAllUserDataApi, getUserDataByUserIdApi, getUserDataByUserNameApi } from './authApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  // isStoreLoading: false,
  // sendOtp: []
  selectedUserDetails: {},
  allUsersCount: {},
  allUserData: [],
  userData: {},
  isUserDataLoading: true,
  isCountUserLoading: true,
  userPageSize: 50
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDataByUserNameApi.fulfilled, (state, action) => {
      state.selectedUserDetails = action.payload;
    });
    builder.addCase(getAllUserCountsApi.pending, (state, action) => {
      state.isCountUserLoading = true;
    });
    builder.addCase(getAllUserCountsApi.fulfilled, (state, action) => {
      state.isCountUserLoading = false;
      state.allUsersCount = action.payload;
    });
    builder.addCase(getAllUserCountsApi.rejected, (state, action) => {
      state.isCountUserLoading = false;
    });
    builder.addCase(getAllUserDataApi.pending, (state, action) => {
      state.isUserDataLoading = true;
    });
    builder.addCase(getAllUserDataApi.fulfilled, (state, action) => {
      state.isUserDataLoading = false;
      state.allUserData = action.payload;
    });
    builder.addCase(getAllUserDataApi.rejected, (state, action) => {
      state.isUserDataLoading = false;
    });
    builder.addCase(getUserDataByUserIdApi.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  }
});

export const { actions } = slice;
export const authActions = slice.actions;

export default slice.reducer;
