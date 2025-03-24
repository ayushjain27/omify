// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { Grid, Stack, InputLabel, OutlinedInput } from '@mui/material';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { AlertBox } from 'components/AlertBox';
import { useState } from 'react';
// import FileUpload from 'components/FileUpload';

// const handleFileSelect = (file) => {
//   console.log('Selected file:', file);
//   // Handle file upload logic here
// };

// assets

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  return (
    <>
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
        onSubmit={async (values, { setSubmitting }) => {
          console.log('Form submitted with values:', values);
          // localStorage.setItem('omifyUserPhoneNumber', values.phoneNumber)
          try {
            console.log('Form submitted with values:', values);

            // Create the data object to send in the POST request
            const data = {
              email: values.email,
              name: values.name,
              phoneNumber:`+91${values.phoneNumber.slice(-10)}`
            };

            // Sending the POST request with the values
            const response = await axios.post('https://omify-backend.vercel.app/auth/signUp', data);

            // Check if the request was successful and navigate
            if (response.status === 200) {
              console.log('API request successful:', response.data);
              // if (response.data?.message === 'This user is already exists') {
              //   setIsAlert(true);
              // } else {
              //   navigate('/verify', { state: data });
              // }
            } else {
              console.error('API request failed with status:', response.status);
            }
          } catch (error) {
            console.error('Error during API request:', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <form noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="name">Name*</InputLabel>
                  <OutlinedInput
                    id="name"
                    value={values.name}
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    fullWidth
                    error={Boolean(touched.name && errors.name)}
                  />
                </Stack>
                {touched.name && errors.name && (
                  <FormHelperText error id="helper-text-name">
                    {errors.name}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="helper-text-email">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    id="phoneNumber"
                    type="number"
                    value={values.phoneNumber}
                    name="phoneNumber"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      // changePassword(e.target.value);
                    }}
                    placeholder="Enter your phone number"
                    inputProps={{
                      maxLength: 10
                    }}
                  />
                </Stack>
                {touched.phoneNumber && errors.phoneNumber && (
                  <FormHelperText error id="helper-text-phoneNumber">
                    {errors.phoneNumber}
                  </FormHelperText>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="adhaarCardNumber">Adhaar Card Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.adhaarCardNumber && errors.adhaarCardNumber)}
                    id="adhaarCardNumber"
                    type="number"
                    value={values.adhaarCardNumber}
                    name="adhaarCardNumber"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    placeholder="Enter your Adhaar Card Number"
                  />
                </Stack>
                {touched.adhaarCardNumber && errors.adhaarCardNumber && (
                  <FormHelperText error id="helper-text-adhaarCardNumber">
                    {errors.adhaarCardNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="panCardNumber">Pan Card Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.panCardNumber && errors.panCardNumber)}
                    id="panCardNumber"
                    value={values.panCardNumber}
                    name="panCardNumber"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    placeholder="Enter your Pan Number"
                  />
                </Stack>
                {touched.panCardNumber && errors.panCardNumber && (
                  <FormHelperText error id="helper-text-panCardNumber">
                    {errors.panCardNumber}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="panCardNumber">Add Aadhaar Card Photo</InputLabel>
                  <FileUpload onFileSelect={handleFileSelect} />
                </Stack>
                {touched.panCardNumber && errors.panCardNumber && (
                  <FormHelperText error id="helper-text-panCardNumber">
                    {errors.panCardNumber}
                  </FormHelperText>
                )}
              </Grid> */}
              {errors.submit && (
                <Grid size={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid size={12}>
                <AnimateButton>
                  <Button fullWidth size="large" variant="contained" color="primary">
                    Create Account
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
