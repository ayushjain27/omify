import React from 'react';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';

const Verify = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40%',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Verify OTP</Typography>

        <Formik
          initialValues={{ otp: '' }}
          validationSchema={Yup.object({
            otp: Yup.number().required('Otp is required').min(6, 'Min 6 digit is required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const data = {
                email: state.email, // You can add other fields to the data object if needed
                otpId: String(values.otp),
                phoneNumber: String(state?.phoneNumber), // Correct syntax to assign value
                name: state?.name // Correct syntax to assign value
              };
              const response = await axios.post('http://localhost:12000/auth/verifyOtp', data);
              if (response.status === 400 && response.data?.message === 'Invalid or expired OTP') {
                setErrors({ otp: 'Invalid or expired OTP' });
              }
              if (response.status === 200) {
                console.log('API request successful:', response.data);
                const omifyPhoneNumber = await localStorage.setItem('omifyUserPhoneNumber', response.data.phoneNumber)
                setIsAuthenticated(true);
                console.log("kmrekf");
                navigate('/dashboard/default');
                console.log("frejnj")
              } else {
                console.error('API request failed with status:', response.status);
              }
            } catch (error) {
              console.error('Error during API request:', error.message);
              setErrors({ email: 'Login failed, please try again' });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values, handleSubmit, isSubmitting }) => (
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Otp"
                name="otp"
                autoComplete="otp"
                autoFocus
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.otp && Boolean(errors.otp)}
                helperText={touched.otp && errors.otp}
                inputProps={{ style: { borderRadius: '8px' } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
                disabled={isSubmitting}
              >
                Verify your Otp
              </Button>
              {/* <Typography component={Link} to={'/register'} variant="body2" color="text.secondary" align="center">
                Don't have an account? Sign Up
              </Typography> */}
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Verify;