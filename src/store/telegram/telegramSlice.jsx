import { createSlice } from '@reduxjs/toolkit';
import { countAllTelegramPagesByUserNameApi, getTelegramPagePaginatedApi } from './telegramApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  isCountAllTelegramPageLoading: true,
  countAllTelegramPage: {},
  isTelegramTablePaginatedLoading: true,
  telegramList: [],
  telegramListPageSize: 50
};

const slice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(countAllTelegramPagesByUserNameApi.pending, (state, action) => {
      state.isCountAllTelegramPageLoading = true;
    });
    builder.addCase(countAllTelegramPagesByUserNameApi.fulfilled, (state, action) => {
      state.isCountAllTelegramPageLoading = false;
      state.countAllTelegramPage = action.payload;
    });
    builder.addCase(countAllTelegramPagesByUserNameApi.rejected, (state, action) => {
      state.isCountAllTelegramPageLoading = false;
    });
    builder.addCase(getTelegramPagePaginatedApi.pending, (state, action) => {
      state.isTelegramTablePaginatedLoading = false;
    });
    builder.addCase(getTelegramPagePaginatedApi.fulfilled, (state, action) => {
      state.isTelegramTablePaginatedLoading = true;
      state.telegramList = action.payload;
    });
    builder.addCase(getTelegramPagePaginatedApi.rejected, (state, action) => {
      state.isTelegramTablePaginatedLoading = false;
    });
  }
});

export const { actions } = slice;
export const telegramActions = slice.actions;

export default slice.reducer;
