import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  FormHelperText,
  Avatar,
  Fade,
  Grow,
  Zoom
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPaymentDetailsApi, getPaymentPageDetailByIdApi } from '../../store/payment-page/paymentPageApi';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
});

export default function ContentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const { paymentPageDetail } = useSelector(({ paymentPageReducer }) => paymentPageReducer);

  const [userDetail, setUserDetail] = useState({});
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPaymentPageDetailByIdApi({ id }));
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    // Handle form submission
    console.log('Form submitted:', values);
    let reqBody = {...values};
    reqBody.paymentAmount = paymentPageDetail?.price;
    reqBody.paymentId = paymentPageDetail?._id;
    reqBody.userName = paymentPageDetail?.userName;
    await dispatch(createUserPaymentDetailsApi(reqBody));
    // Add your payment processing logic here
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        minHeight: '100vh',
        py: 4
      }}
    >
      {/* Hero Image Section */}
      <Box
        sx={{
          height: '200px',
          backgroundImage: !paymentPageDetail?.imageUrl
            ? `url(${paymentPageDetail.imageUrl})`
            : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
          backgroundSize: 'cover',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mx: 4,
          mb: 4,
          boxShadow: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 2
          }
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'white',
            zIndex: 1,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {paymentPageDetail?.pageTitle || 'Payment Page'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
        <Grid container spacing={4} maxWidth="lg">
          {/* Left Section */}
          <Grid item xs={12} md={7}>
            <Grow in={true} timeout={800}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 56,
                      height: 56,
                      mr: 2
                    }}
                  >
                    {paymentPageDetail?.userDetails?.name?.slice(0, 1) || 'P'}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {paymentPageDetail?.userDetails?.name || 'Payment Request'}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />

                <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                  About This Payment
                </Typography>

                {paymentPageDetail?.imageUrl && (
                  <Zoom in={true} timeout={1000}>
                    <Box
                      sx={{
                        my: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: 2
                      }}
                    >
                      <img
                        src={paymentPageDetail.imageUrl}
                        alt="Payment"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </Box>
                  </Zoom>
                )}

                <Typography variant="body1" color="text.secondary" paragraph>
                  {paymentPageDetail?.description || 'Please complete your payment using the form on the right.'}
                </Typography>

                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    borderRadius: 2,
                    borderLeft: '4px solid',
                    borderColor: 'primary.main'
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Your payment will be processed securely. Please ensure all details are correct before submitting.
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          </Grid>

          {/* Right Section - Form */}
          <Grid item xs={12} md={5}>
            <Fade in={true} timeout={1200}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)'
                  }
                }}
                elevation={3}
              >
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                        Complete Your Payment
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={3}>
                        Please fill in your details to proceed
                      </Typography>

                      <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />

                      {/* Name Field */}
                      <Stack spacing={1} mb={3}>
                        <InputLabel htmlFor="name" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                          Full Name*
                        </InputLabel>
                        <OutlinedInput
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          fullWidth
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(0,0,0,0.1)'
                            }
                          }}
                        />
                        {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                      </Stack>

                      {/* Email Field */}
                      <Stack spacing={1} mb={3}>
                        <InputLabel htmlFor="email" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                          Email Address*
                        </InputLabel>
                        <OutlinedInput
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          fullWidth
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(0,0,0,0.1)'
                            }
                          }}
                        />
                        {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
                      </Stack>

                      {/* Phone Number Field */}
                      <Stack spacing={1} mb={3}>
                        <InputLabel htmlFor="phoneNumber" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                          Phone Number*
                        </InputLabel>
                        <OutlinedInput
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Enter your phone number"
                          fullWidth
                          type="tel" // Changed back to 'tel' for better mobile keyboard
                          value={values.phoneNumber}
                          onChange={(e) => {
                            // Only allow numbers and limit to 10 digits
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            handleChange({
                              target: {
                                name: 'phoneNumber',
                                value: value
                              }
                            });
                          }}
                          onBlur={handleBlur}
                          error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                          inputProps={{
                            inputMode: 'numeric', // Shows numeric keyboard on mobile
                            pattern: '[0-9]*', // Ensures only numbers can be entered
                            maxLength: 10 // Physical limit
                          }}
                          sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(0,0,0,0.1)'
                            }
                          }}
                        />
                        {touched.phoneNumber && errors.phoneNumber && <FormHelperText error>{errors.phoneNumber}</FormHelperText>}
                      </Stack>

                      {/* Payment Amount */}
                      <Box
                        sx={{
                          backgroundColor: 'rgba(46, 125, 50, 0.1)',
                          borderRadius: 2,
                          p: 2,
                          mb: 3,
                          textAlign: 'center'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          Payment Amount
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" color="success.dark">
                          ₹ {paymentPageDetail?.price || '0.00'}
                        </Typography>
                      </Box>

                      {/* Submit Button */}
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          textTransform: 'none',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          '&:hover': {
                            boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.3s'
                        }}
                      >
                        {paymentPageDetail?.buttonText || 'Pay Now'} →
                      </Button>

                      <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
                        Secure payment powered by your platform
                      </Typography>
                    </form>
                  )}
                </Formik>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
