import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { Grid, Stack, FormHelperText, InputLabel, Button, TextField } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AlertBox } from 'components/AlertBox';

export default function AuthLogin() {
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').required('Email is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('Form submitted with values:', values);

            const data = { email: values.email };

            // Sending the POST request
            const response = await axios.post('https://omify-backend.vercel.app/auth/login', data);

            if (response.status === 200) {
              console.log('API request successful:', response.data);
              if (response.data?.message === 'User does not exists') {
                setIsAlert(true);
              } else {
                navigate('/verify', { state: data });
              }
            } else {
              console.error('API request failed with status:', response.status);
            }
          } catch (error) {
            console.error('Error during API request:', error.message);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, touched, values, handleSubmit, isSubmitting }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <TextField
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email ? errors.email : ''}
                  />
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {isAlert && <AlertBox setIsAlert={setIsAlert} />}
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
