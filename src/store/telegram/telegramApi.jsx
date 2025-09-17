import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  telegramSendOtp: 'telegram/send-otp',
  telegramVerifyOtp: 'telegram/verify-otp',
  telegramCreateChannel: 'telegram/create-channel',
  telegramVerify2FA: 'telegram/verify-2fa',
  createTelegramPage: 'telegram/create-telegram-page',
  uploadTelegramThumbnail: 'telegram/upload',
  countAllTelegramPagesByUserName: 'telegram/countAllTelegramPagesByUserName',
  getTelegramPagePaginated: 'telegram/getAllTelegramPagesPaginated',
  getTelegramPageDetailsById: 'telegram/getTelegramPageDetailsById'
};

export const telegramSendOtpApi = createAsyncThunk('store/telegramSendOtpApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.telegramSendOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    // if (data?.message) {
    //   return data;
    // }

    if (data) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const uploadTelegramThumbnailApi = createAsyncThunk('store/uploadTelegramThumbnailApi', async (params, thunkApi) => {
  try {
    console.log(params,"dlke3mw")
    const response = await axios.request({
      url: `${urls.uploadTelegramThumbnail}`,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const data = await response.data;

    if (data?.message) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const telegramVerifyOtpApi = createAsyncThunk('store/telegramVerifyOtpApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.telegramVerifyOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    // if (data?.message) {
    //   return data;
    // }

    if (data) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const telegramCreateChannelApi = createAsyncThunk('store/telegramCreateChannelApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.telegramCreateChannel}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    // if (data?.message) {
    //   return data;
    // }

    if (data) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const telegramVerify2FAApi = createAsyncThunk('store/telegramVerify2FAApi', async (params, thunkApi) => {
  try {
    console.log(params,"params")
    const response = await axios.request({
      url: `${urls.telegramVerify2FA}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    // if (data?.message) {
    //   return data;
    // }

    if (data) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const createTelegramPageApi = createAsyncThunk('store/createTelegramPageApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.createTelegramPage}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    if (data?.message) {
      return data;
    }

    if (data) {
      return data;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const countAllTelegramPagesByUserNameApi = createAsyncThunk(
  'serviceplug/countAllTelegramPagesByUserNameApi',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(`${urls.countAllTelegramPagesByUserName}`, { params });
      if (response.data) {
        return response.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getTelegramPagePaginatedApi = createAsyncThunk('serviceplug/getTelegramPagePaginatedApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.getTelegramPagePaginated}`,
      method: 'post',
      data: params
    });
    const data = await response.data;
    if (data) {
      return data;
    }
    return [];
  } catch (err) {
    return thunkApi.rejectWithValue(`Something went wrong. Please try again!, ${err}`);
  }
});

export const getTelegramPageDetailsByIdApi = createAsyncThunk('serviceplug/getTelegramPageDetailsByIdApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(`${urls.getTelegramPageDetailsById}`, { params });
    if (response.data) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
