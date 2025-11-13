import { createSlice } from '@reduxjs/toolkit';
import { countAllTelegramPagesByUserNameApi, countAllTelegramUsersByChannelIdApi, getAllTelegramUsersByChannelIdApi, getTelegramPageDetailsByIdApi, getTelegramPagePaginatedApi } from './telegramApi';
// import { sendOtpApi } from './authApi';

// ----------------------------------------------------------------------

const initialState = {
  isCountAllTelegramPageLoading: true,
  countAllTelegramPage: {},
  isTelegramTablePaginatedLoading: true,
  telegramList: [],
  telegramListPageSize: 50,
  telegramNewUserListPageSize: 50,
  telegramPageDetail: {},
  countAllTelegramUsers: {},
  isTelegramNewUSerLoading: true,
  telegramNewUserList: []
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
    builder.addCase(getTelegramPageDetailsByIdApi.fulfilled, (state, action) => {
      state.telegramPageDetail = action.payload;
    });
    builder.addCase(countAllTelegramUsersByChannelIdApi.fulfilled, (state, action) => {
      state.countAllTelegramUsers = action.payload;
    });
    builder.addCase(getAllTelegramUsersByChannelIdApi.pending, (state, action) => {
      state.isTelegramNewUSerLoading = false;
    });
    builder.addCase(getAllTelegramUsersByChannelIdApi.fulfilled, (state, action) => {
      state.isTelegramNewUSerLoading = true;
      state.telegramNewUserList = action.payload;
    });
    builder.addCase(getAllTelegramUsersByChannelIdApi.rejected, (state, action) => {
      state.isTelegramNewUSerLoading = false;
    });
  }
});

export const { actions } = slice;
export const telegramActions = slice.actions;

export default slice.reducer;
