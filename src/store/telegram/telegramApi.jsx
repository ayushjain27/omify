import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  telegramSendOtp: 'telegram/send-otp',
  telegramVerifyOtp: 'telegram/verify-otp',
  telegramVerify2FA: 'telegram/verify-2fa'
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

export const telegramVerifyOtpApi = createAsyncThunk('store/telegramVerifyOtpApi', async (params, thunkApi) => {
  try {
    console.log(params,"params")
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