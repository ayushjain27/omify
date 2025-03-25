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
import { useNavigate, Link } from 'react-router-dom';

const LoginScreen = () => {
  const navigate = useNavigate();

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
        <Typography component="h1" variant="h5">Login</Typography>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Must be a valid email').required('Email is required')
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await axios.post('https://omify-backend.vercel.app/auth/login', { email: values.email.toLowerCase() });
              if (response.status === 200) {
                if (response.data?.message === 'User does not exist') {
                  setErrors({ email: 'User does not exist' });
                } else {
                  navigate('/verify', { state: { email: values.email.toLowerCase() } });
                }
              }
            } catch (error) {
              console.error('Error during API request:', error);
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                Login
              </Button>
              <Typography component={Link} to={'/register'} variant="body2" color="text.secondary" align="center">
                Don't have an account? Sign Up
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginScreen;