import { createSlice } from '@reduxjs/toolkit';
import { countAllPaymentPageByUserNameApi, countAllUsersDataByUserNameApi, getAllUsersDataByUserNameApi, getPaymentPageDetailByIdApi, getPaymentTablePaginatedApi } from './paymentPageApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  countAllPaymentPage: {},
  isCountAllPaymentPageLoading: true,
  isPaymentTablePaginatedLoading: true,
  paymentList: [],
  paymentListPageSize: 50,
  paymentPageDetail: {},
  countAllUserData: {},
  isCountAllUserDataLoading: true,
  isUserDataPaginatedLoading: true,
  userDataList: [],
  userDataListPageSize: 50,
};

const slice = createSlice({
  name: 'paymentPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countAllPaymentPageByUserNameApi.pending, (state, action) => {
      state.isCountAllPaymentPageLoading = true;
    });
    builder.addCase(countAllPaymentPageByUserNameApi.fulfilled, (state, action) => {
      state.isCountAllPaymentPageLoading = false;
      state.countAllPaymentPage = action.payload;
    });
    builder.addCase(countAllPaymentPageByUserNameApi.rejected, (state, action) => {
      state.isCountAllPaymentPageLoading = false;
    });
    builder.addCase(getPaymentTablePaginatedApi.pending, (state, action) => {
      state.isPaymentTablePaginatedLoading = false;
    });
    builder.addCase(getPaymentTablePaginatedApi.fulfilled, (state, action) => {
      state.isPaymentTablePaginatedLoading = true;
      state.paymentList = action.payload;
    });
    builder.addCase(getPaymentTablePaginatedApi.rejected, (state, action) => {
      state.isPaymentTablePaginatedLoading = false;
    });
    builder.addCase(getPaymentPageDetailByIdApi.fulfilled, (state, action) => {
      state.paymentPageDetail = action.payload;
    });
    builder.addCase(countAllUsersDataByUserNameApi.pending, (state, action) => {
      state.isCountAllUserDataLoading = true;
    });
    builder.addCase(countAllUsersDataByUserNameApi.fulfilled, (state, action) => {
      state.isCountAllUserDataLoading = false;
      state.countAllUserData = action.payload;
    });
    builder.addCase(countAllUsersDataByUserNameApi.rejected, (state, action) => {
      state.isCountAllUserDataLoading = false;
    });
    builder.addCase(getAllUsersDataByUserNameApi.pending, (state, action) => {
      state.isUserDataPaginatedLoading = false;
    });
    builder.addCase(getAllUsersDataByUserNameApi.fulfilled, (state, action) => {
      state.isUserDataPaginatedLoading = true;
      state.userDataList = action.payload;
    });
    builder.addCase(getAllUsersDataByUserNameApi.rejected, (state, action) => {
      state.isUserDataPaginatedLoading = false;
    });
  }
});

export const { actions } = slice;
export const paymentPageActions = slice.actions;

export default slice.reducer;
