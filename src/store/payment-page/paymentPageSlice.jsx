import { createSlice } from '@reduxjs/toolkit';
import { countAllPaymentPageByUserNameApi, getPaymentPageDetailByIdApi, getPaymentTablePaginatedApi } from './paymentPageApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  countAllPaymentPage: {},
  isCountAllPaymentPageLoading: true,
  isPaymentTablePaginatedLoading: true,
  paymentList: [],
  paymentListPageSize: 50,
  paymentPageDetail: {}
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
  }
});

export const { actions } = slice;
export const paymentPageActions = slice.actions;

export default slice.reducer;
