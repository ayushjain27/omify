import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, InputLabel, OutlinedInput, Paper, Stack, Typography, FormHelperText } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function ContentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [data, setData] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [imageSrc, setImageSrc] = useState('');
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://omify-backend.vercel.app/paymentPage/getPaymentPageDetailById?id=${id}`);

        if (response.status === 200) {
          setData(response.data);
          if (!isEmpty(response?.data?.imageUrl)) {
            const filename = response.data.imageUrl.split('/').pop();
            const imageResponse = await axios.get(`https://omify-backend.vercel.app/paymentPage/getImage/${filename}`, { responseType: 'blob' });
            setImageSrc(URL.createObjectURL(imageResponse.data));
          }

          if (!isEmpty(response.data)) {
            const res = await axios.get('https://omify-backend.vercel.app/auth/getUserDataById', {
              params: { phoneNumber: response?.data?.phoneNumber }
            });
            if (!isEmpty(res?.data)) setUserDetail(res?.data);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!isEmpty(id)) fetchData();
  }, [id]);

  console.log(qrCode,"qrCode")

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', px: 2 }}>
      <Grid container spacing={4} maxWidth="lg">
        {/* Left Section */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Owner Name
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userDetail?.name || 'N/A'}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h5" fontWeight="bold">
              Title
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {data?.pageTitle || 'N/A'}
            </Typography>

            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {data?.description || 'N/A'}
            </Typography>

            <Divider sx={{ my: 2 }} />
            {imageSrc && (
              <Box sx={{ my: 2 }}>
                <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: 8, height: 300 }} />
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Section - Form */}
        <Grid item xs={12} md={5}>
          <Formik
            initialValues={{ name: '', email: '', phoneNumber: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              email: Yup.string().email('Invalid email').required('Email is required'),
              phoneNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Must be 10 digits')
                .required('Phone Number is required')
            })}
            onSubmit={async (values, { setSubmitting }) => {
              console.log('Submitting:', values);
              try {
                console.log('Form submitted with values:', values);

                // Create the data object to send in the POST request
                const data = {
                  email: values.email,
                  name: values.name,
                  phoneNumber: `+91${values.phoneNumber.slice(-10)}`,
                  paymentPageId: id
                };

                console.log(data, 'dmkr');

                // Sending the POST request with the values
                const response = await axios.post('https://omify-backend.vercel.app/paymentPage/createUserPaymentDetails', data);

                // Check if the request was successful and navigate
                if (response.status === 200) {
                  console.log(id,"demk")
                  const qrResponse = await axios.post('https://omify-backend.vercel.app/paymentPage/create-qr', {
                    paymentPageId: id
                  });

                  console.log(qrResponse,"qrResponse")

                  if (qrResponse.data) {
                    setQrCode(qrResponse.data.image_url);
                  }
                } else {
                  console.error('API request failed with status:', response.status);
                }
              } catch (error) {
                console.error('Error during API request:', error);
            } finally {
              setSubmitting(false);
            }
              // API call logic goes here
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Paper sx={{ p: 4, borderRadius: 2 }} elevation={3}>
                  {qrCode ? (
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>Scan This QR Code to Pay</Typography>
                      {qrCode && <img src={qrCode} alt="QR Code" style={{ width: '400px', height: '300px' }} />}
                    </Box>
                  ) : (
                    <div>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Enter Your Details
                      </Typography>

                      {/* Name Field */}
                      <Stack spacing={1} mb={2}>
                        <InputLabel htmlFor="name">Name*</InputLabel>
                        <OutlinedInput
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          fullWidth
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.name && errors.name)}
                        />
                        {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                      </Stack>

                      {/* Email Field */}
                      <Stack spacing={1} mb={2}>
                        <InputLabel htmlFor="email">Email Address*</InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          fullWidth
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.email && errors.email)}
                        />
                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                      </Stack>

                      {/* Phone Number Field */}
                      <Stack spacing={1} mb={2}>
                        <InputLabel htmlFor="phoneNumber">Phone Number*</InputLabel>
                        <OutlinedInput
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          fullWidth
                          type="tel"
                          value={values.phoneNumber}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                        />
                        {touched.phoneNumber && errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
                      </Stack>

                      {/* Payment Button */}
                      <Button variant="contained" color="success" fullWidth sx={{ mb: 2, py: 1.5 }}>
                        Payment Amount:  ₹ {data?.price}
                      </Button>

                      {/* Submit Button */}
                      <Button variant="contained" color="primary" fullWidth type="submit" sx={{ py: 1.5 }}>
                        Make Payment
                      </Button>
                    </div>
                  )}
                </Paper>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
}
