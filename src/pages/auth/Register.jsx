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
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
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
        <Typography component="h1" variant="h5">Register</Typography>

        <Formik
           initialValues={{
            name: '',
            email: '',
            phoneNumber: ''
            // panCardNumber: '',
            // adhaarCardNumber: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Must be a valid email').required('Email is required'),
            phoneNumber: Yup.number().required('Phone Number is required').min(10, 'Min 10 length is required')
            // adhaarCardNumber: Yup.number().required('Adhaar Card Number is required').min(10, 'Min 12 length is required'),
            // panCardNumber: Yup.number().required('Pan Card Number is required').min(10, 'Min 12 length is required'),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {

              const data = {
                email: values.email,
                name: values.name,
                phoneNumber:`+91${values.phoneNumber.slice(-10)}`
              };
              const response = await axios.post('http://localhost:12000/auth/signUp', data);
              if (response.status === 200) {
                if (response.data?.message === 'This user is already exists') {
                  setErrors({ phoneNumber: 'User already exist' });
                } else {
                  navigate('/verify', { state: data });
                }
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
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                inputProps={{ style: { borderRadius: '8px' } }}
              />
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                autoFocus
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
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
                SignUp
              </Button>
              <Typography component={Link} to={'/login'} variant="body2" color="text.secondary" align="center">
                Already have an account? Login
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;