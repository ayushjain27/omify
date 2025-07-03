import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  sendOtp: 'auth/login',
  verifyOtp: 'auth/verifyOtp',
  getUserDataByUserName: 'auth/getUserDataByUserName',
  updateUserProfileByUserName: 'auth/updateUserProfileByUserName',
  getAllUserCounts: 'auth/countAllUsers',
  getAllUserData: 'auth/getAllUserDetails',
  updateKycByUserName: 'auth/updateKycByUserName',
  uploadAadharCardImage: 'auth/uploadPanCardImage',
  uploadCancelCheckImage: 'auth/uploadCancelCheckImage'
};

export const sendOtpApi = createAsyncThunk('store/sendOtpApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.sendOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    if (data?.message) {
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
    const response = await axios.request({
      url: `${urls.verifyOtp}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    if (data?.message) {
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

export const getUserDataByUserNameApi = createAsyncThunk('serviceplug/getUserDataByUserNameApi', async (params, thunkApi) => {
  try {
    const accessToken = params.token;
    const response = await axios.get(`${urls.getUserDataByUserName}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (response.data?.result) {
      return response.data.result;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateUserProfileByUserNameApi = createAsyncThunk('store/updateUserProfileByUserNameApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.updateUserProfileByUserName}`,
      method: 'post',
      data: params
    });
    const data = await response.data;

    if (data?.message) {
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

export const updateKycByUserNameApi = createAsyncThunk('store/updateKycByUserNameApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.updateKycByUserName}`,
      method: 'post',
      data: params
    });
    const data = await response.data;
    console.log(data, 'demkdfme');

    if (data?.message) {
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

export const getAllUserCountsApi = createAsyncThunk('serviceplug/getAllUserCountsApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(urls.getAllUserCounts);
    if (response.data) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getAllUserDataApi = createAsyncThunk('serviceplug/getAllUserDataApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(urls.getAllUserData, { params });
    if (response.data?.result) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const uploadAadharCardImageApi = createAsyncThunk('store/uploadAadharCardImageApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.uploadAadharCardImage}`,
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

export const uploadCancelCheckImageApi = createAsyncThunk('store/uploadCancelCheckImageApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.uploadCancelCheckImage}`,
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
