import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { 
  Stack, 
  Alert, 
  TextField, 
  Typography,
  Box,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Mail, 
  User, 
  Lock, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { getUserDataByUserNameApi, sendOtpApi, verifyOtpApi } from '../../store/auth/authApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const { setIsAuthenticated, setCheckUserProfile } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          enqueueSnackbar('OTP sent successfully. Please check your email', {
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
    } else {
      enqueueSnackbar('User Does not exists, Enter user Id to login', {
        variant: 'error'
      });
      setOtpLoading(false);
    }
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Box sx={{ width: '100%' }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={isMobile ? 2 : 3}>
            {errors.afterSubmit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.afterSubmit}
              </Alert>
            )}

            <TextField
              fullWidth
              autoComplete="email"
              label="Email Address"
              {...getFieldProps('email')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('email', _.toLower(value));
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: isMobile ? 48 : 56,
                }
              }}
            />

            <TextField
              fullWidth
              autoComplete="userId"
              label="User ID"
              disabled={otpVisible}
              {...getFieldProps('userId')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('userId', _.toUpper(value));
              }}
              error={Boolean(touched.userId && errors.userId)}
              helperText={touched.userId && errors.userId}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} color={theme.palette.text.secondary} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: isMobile ? 48 : 56,
                }
              }}
            />

            <Typography variant="caption" color="error" sx={{ mt: -1, mb: -1 }}>
              Enter user ID if you are a new user
            </Typography>

            {otpVisible && (
              <TextField
                fullWidth
                autoComplete="otp"
                type="number"
                label="Verification Code"
                {...getFieldProps('otp')}
                error={Boolean(touched.otp && errors.otp)}
                helperText={touched.otp && errors.otp}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} color={theme.palette.text.secondary} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: isMobile ? 48 : 56,
                  }
                }}
              />
            )}
          </Stack>

          {!otpVisible ? (
            <LoadingButton
              fullWidth
              size={isMobile ? 'medium' : 'large'}
              variant="contained"
              type="submit"
              sx={{ 
                mt: 3,
                py: isMobile ? 1 : 1.5,
                borderRadius: 2
              }}
              loading={loading}
              loadingPosition="end"
              endIcon={<ArrowRight size={20} />}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </LoadingButton>
          ) : (
            <LoadingButton
              fullWidth
              size={isMobile ? 'medium' : 'large'}
              variant="contained"
              onClick={verifyOtp}
              sx={{ 
                mt: 2,
                py: isMobile ? 1 : 1.5,
                borderRadius: 2
              }}
              loading={otpLoading}
              loadingPosition="end"
              endIcon={<RefreshCw size={20} />}
            >
              {otpLoading ? 'Verifying...' : 'Verify OTP'}
            </LoadingButton>
          )}
        </Form>
      </FormikProvider>
    </Box>
  );
}