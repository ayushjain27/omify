import PropTypes from 'prop-types';
import React, { useState } from 'react';

// material-ui
import { Grid, Stack, FormHelperText, InputLabel, OutlinedInput, Button, FormHelperText } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AlertBox } from 'components/AlertBox';
import { isEmpty } from 'lodash';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - LOGIN ||============================ //

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
        onSubmit={async (values) => {
          try {
            console.log('Form submitted with values:', values);

            // Create the data object to send in the POST request
            const data = {
              email: values.email // You can add other fields to the data object if needed
            };

            // Sending the POST request with the values
            const response = await axios.post('https://omify-backend.vercel.app/auth/login', data);

            // Check if the request was successful and navigate
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
          }
        }}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
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
