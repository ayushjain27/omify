import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  sendOtp: 'auth/login',
  verifyOtp: 'auth/verifyOtp'
};

export const sendOtpApi = createAsyncThunk('store/sendOtpApi', async (params, thunkApi) => {
  try {
    console.log(params,"demkfmr")
    const response = await axios.request({
      url: `${urls.sendOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;
    console.log(data,"demkdk")

    if(data?.message){
      return data;
    }

    if (data && data.result) {
      return data.result;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});

export const verifyOtpApi = createAsyncThunk('store/verifyOtpApi', async (params, thunkApi) => {
  try {
    console.log(params,"demkfmr")
    const response = await axios.request({
      url: `${urls.verifyOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;
    console.log(data,"demkdk")

    if(data?.message){
      return data;
    }

    if (data && data.result) {
      return data.result;
    }
    return thunkApi.rejectWithValue('Something went wrong');
  } catch (err) {
    // thunkApi.dispatch(showMessage({ message: 'Something went wrong. please try again!', variant: 'error' }));
    return thunkApi.rejectWithValue('Something went wrong. Please try again!');
  }
});
