import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  createPayment: 'paymentPage/create',
  uploadThumbnail: '/paymentPage/upload',
  uploadFile: '/paymentPage/uploadAnything',
  countAllPaymentPageByUserName: '/paymentPage/countAllPaymentPagesByUserName',
  getPaymentTablePaginated: '/paymentPage/getAllPaymentPagesPaginated'
};

export const createPaymentApi = createAsyncThunk('store/createPaymentApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.createPayment}`,
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

export const uploadThumbnailApi = createAsyncThunk('store/uploadThumbnailApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.uploadThumbnail}`,
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

export const uploadFileApi = createAsyncThunk('store/uploadFileApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.uploadFile}`,
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

export const countAllPaymentPageByUserNameApi = createAsyncThunk(
  'serviceplug/countAllPaymentPageByUserNameApi',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(`${urls.countAllPaymentPageByUserName}`, { params });
      if (response.data) {
        return response.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getPaymentTablePaginatedApi = createAsyncThunk('serviceplug/getPaymentTablePaginatedApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.getPaymentTablePaginated}`,
      method: 'post',
      data: params
    });
    const data = await response.data;
    if (data?.result) {
      return data.result;
    }
    return [];
  } catch (err) {
    return thunkApi.rejectWithValue(`Something went wrong. Please try again!, ${err}`);
  }
});
