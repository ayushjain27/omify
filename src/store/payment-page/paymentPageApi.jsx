import _ from 'lodash';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const urls = {
  createPayment: 'paymentPage/create',
  uploadThumbnail: '/paymentPage/upload',
  uploadFile: '/paymentPage/uploadAnything',
  countAllPaymentPageByUserName: '/paymentPage/countAllPaymentPagesByUserName',
  getPaymentTablePaginated: '/paymentPage/getAllPaymentPagesPaginated',
  getPaymentPageDetailById: '/paymentPage/getPaymentPageDetailById',
  updatePaymentPageStatus: '/paymentPage/updatePaymentStatus',
  createUserPaymentDetails: '/paymentPage/createUserPaymentDetails',
  countAllUsersDataByUserName: '/paymentPage/countAllUsersDataByUserName',
  getAllUsersDataByUserName: '/paymentPage/getAllUsersDataByUserName'
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
    console.log(params,"Dwlkmfkl")
    const response = await axios.request({
      url: `${urls.uploadThumbnail}`,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    const data = await response.data;
    console.log(response.data,"dweklmlk")

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

export const getPaymentPageDetailByIdApi = createAsyncThunk('serviceplug/getPaymentPageDetailByIdApi', async (params, thunkApi) => {
  try {
    console.log(params, 'dmek');
    const response = await axios.get(`${urls.getPaymentPageDetailById}`, { params });
    if (response.data) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getPaymentTablePaginatedApi = createAsyncThunk('serviceplug/getPaymentTablePaginatedApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.getPaymentTablePaginated}`,
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

export const createUserPaymentDetailsApi = createAsyncThunk('serviceplug/createUserPaymentDetailsApi', async (params, thunkApi) => {
  try {
    const response = await axios.request({
      url: `${urls.createUserPaymentDetails}`,
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

export const updatePaymentPageStatusApi = createAsyncThunk('store/updatePaymentPageStatusApi', async (params, thunkApi) => {
  try {
    const response = await axios.post(`${urls.updatePaymentPageStatus}`, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.data;
    console.log(data, 'Dlemk');

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

export const countAllUsersDataByUserNameApi = createAsyncThunk('serviceplug/countAllUsersDataByUserNameApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(`${urls.countAllUsersDataByUserName}`, { params });
    if (response.data) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getAllUsersDataByUserNameApi = createAsyncThunk('serviceplug/getAllUsersDataByUserNameApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(`${urls.getAllUsersDataByUserName}`, { params });
    if (response.data?.result) {
      return response.data.result;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
