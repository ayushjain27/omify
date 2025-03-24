/* eslint-disable no-unused-vars */
import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { Grid, Stack, InputLabel, OutlinedInput } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import { useLocation, useNavigate } from 'react-router';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';

// assets

// ============================|| JWT - LOGIN ||============================ //

export default function VerifyOtp() {
  const location = useLocation();
  console.log(location,"D;e;mrk")
  const state = location.state; // Access the data passed in the state
  console.log(state,"fekm")
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  return (
    <>
      <Formik
        initialValues={{
            otp: '',
        }}
        validationSchema={Yup.object().shape({
          otp: Yup.number().required('Otp is required').min(6, 'Min 6 digit is required'),
        })}
        onSubmit={async(values) => {
          console.log('Form submitted with values:', values);
          try {
            console.log('Form submitted with values:', values);
  
            // Create the data object to send in the POST request
            const data = {
              email: state.email, // You can add other fields to the data object if needed
              otpId: String(values.otp),
              phoneNumber: String(state?.phoneNumber), // Correct syntax to assign value
              name: state?.name // Correct syntax to assign value
            };

            // if (!isEmpty(state?.phoneNumber)) {
            // }

            console.log(data,"demk")
  
            // Sending the POST request with the values
            const response = await axios.post('https://omify-backend.vercel.app/auth/verifyOtp', data);
  
            // Check if the request was successful and navigate
            if (response.status === 200) {
              console.log('API request successful:', response.data);
              const omifyPhoneNumber = await localStorage.setItem('omifyUserPhoneNumber', response.data.phoneNumber)
              setIsAuthenticated(true);
              navigate('/dashboard/default');
            } else {
              console.error('API request failed with status:', response.status);
            }
          } catch (error) {
            console.error('Error during API request:', error.message);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="otp">Otp</InputLabel>
                  <OutlinedInput
                    id="otp"
                    type="number"
                    value={values.otp}
                    name="otp"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Otp"
                    fullWidth
                    error={Boolean(touched.otp && errors.otp)}
                  />
                </Stack>
                {touched.otp && errors.otp && (
                  <FormHelperText error id="standard-weight-helper-text-otp">
                    {errors.otp}
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
                    Verify
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
