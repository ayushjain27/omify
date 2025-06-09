import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, Alert, TextField, Typography } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { getUserDataByUserNameApi, sendOtpApi, verifyOtpApi } from '../../store/auth/authApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const { setIsAuthenticated, setCheckUserProfile } = useAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Please enter a email').email('Please enter valid email')
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      userId: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        setLoading(true);
        const params = {
          email: values.email,
          userId: values.userId
        };
        let response = await dispatch(sendOtpApi(params));
        response = unwrapResult(response);
        if (response?.message === 'OTP sent successfully.') {
          enqueueSnackbar('Otp sent successfully. Please check your email', {
            variant: 'success'
          });
          setLoading(false);
          setOtpVisible(true);
        } else if (response?.message === 'Getting Invalid UserName.') {
          enqueueSnackbar('Getting Invalid UserName. Please check UserName', {
            variant: 'error'
          });
          setLoading(false);
        } else {
          enqueueSnackbar('User Does not exists, Enter user Id to login', {
            variant: 'error'
          });
          setLoading(false);
        }
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({
          afterSubmit: error?.message || 'Something went wrong. Please check your credentials and try again.'
        });
        // }
      }
    }
  });

  const verifyOtp = async () => {
    setOtpLoading(true);
    const reqBody = {
      email: formik.values.email,
      otpId: formik.values.otp,
      userId: formik.values.userId
    };
    let response = await dispatch(verifyOtpApi(reqBody));
    response = unwrapResult(response);
    if (response?.message === 'Invalid OTP.') {
      enqueueSnackbar('Invalid OTP. Please enter valid OTP', {
        variant: 'error'
      });
      setOtpLoading(false);
    } else if (response?.token) {
      let token = localStorage.setItem('accessToken', response.token);
      let result = await dispatch(getUserDataByUserNameApi({ token: response.token }));
      result = unwrapResult(result);
      setOtpLoading(false);
      if (result?.role === 'USER') {
        if (result?.name) {
          setIsAuthenticated(true);
          setCheckUserProfile(false);
          navigate('/dashboard/default');
        } else {
          setCheckUserProfile(true);
          navigate('/userLoginProfile');
          enqueueSnackbar('Please complete your profile', {
            variant: 'success'
          });
        }
      }
      setIsAuthenticated(true);
      setCheckUserProfile(false);
      navigate('/dashboard/default');
      // setOtpLoading(false);
      // setIsAuthenticated(true);
    } else {
      enqueueSnackbar('User Does not exists, Enter user Id to login', {
        variant: 'error'
      });
      setOtpLoading(false);
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <TextField
              fullWidth
              autoComplete="email"
              label="Enter Email"
              {...getFieldProps('email')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('email', _.toLower(value));
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete="userId"
              // type="number"
              label="Enter User Id"
              disabled={otpVisible}
              {...getFieldProps('userId')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('userId', _.toUpper(value));
              }}
              error={Boolean(touched.userId && errors.userId)}
              helperText={touched.userId && errors.userId}
            />
            <Typography
              sx={{
                color: 'red',
                marginTop: '4px !important',
                marginBottom: '-16px !important',
                fontSize: '0.875rem',
                lineHeight: 1.5
              }}
            >
              Enter userId if you are a new user
            </Typography>
            {otpVisible && (
              <TextField
                fullWidth
                autoComplete="otp"
                type="number"
                label="Enter Otp"
                {...getFieldProps('otp')}
                error={Boolean(touched.otp && errors.otp)}
                helperText={touched.otp && errors.otp}
              />
            )}
          </Stack>
          {!otpVisible ? (
            <LoadingButton variant="contained" type="submit" sx={{ mt: 4, width: '100%' }} color="success" loading={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </LoadingButton>
          ) : (
            <LoadingButton variant="contained" sx={{ mt: 2, width: '100%' }} onClick={verifyOtp} color="success" loading={otpLoading}>
              {otpLoading ? 'Verifying OTP' : 'Verify OTP'}
            </LoadingButton>
          )}
          {/* <Typography>{`v ${window?.env?.VERSION_NAME}(${window?.env?.VERSION_CODE})`}</Typography> */}
        </Form>
      </FormikProvider>
    </>
  );
}
