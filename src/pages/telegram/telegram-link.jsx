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
  Zoom,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPaymentDetailsApi, getPaymentPageDetailByIdApi } from '../../store/payment-page/paymentPageApi';
import { getTelegramPageDetailsByIdApi } from '../../store/telegram/telegramApi';

// Validation Schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
});

export default function TelegramLink() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const { telegramPageDetail } = useSelector(({ telegramReducer }) => telegramReducer);

  const [userDetail, setUserDetail] = useState({});
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTelegramPageDetailsByIdApi({ telegramId: id }));
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   // Handle form submission
  //   console.log('Form submitted:', values);
  //   let reqBody = { ...values };
  //   reqBody.paymentAmount = paymentPageDetail?.price;
  //   reqBody.paymentId = paymentPageDetail?._id;
  //   reqBody.userName = paymentPageDetail?.userName;
  //   await dispatch(createUserPaymentDetailsApi(reqBody));
  //   // Add your payment processing logic here
  //   setSubmitting(false);
  // };
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const [selectedPlan, setSelectedPlan] = useState('');

  return (
    <Grid item xs={12} md={8} sx={{ height: '100%', overflow: 'auto' }}>
      <Box sx={{ backgroundColor: '#0F0F23', color: 'white', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', px: 2 }}>
          <Grid container spacing={4} maxWidth="lg">
            {/* Left Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: '#2A2A2A', color: 'white' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'orange', mr: 2 }}>{selectedUserDetails?.name?.slice(0, 1) || 'U'}</Avatar>
                  <Box>
                    <Typography variant="body2" color="grey.400">
                      Created by
                    </Typography>
                    <Typography variant="h6" color="white">
                      {selectedUserDetails?.name || 'User Name'}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="h5" color="grey.400" sx={{ mb: 1 }}>
                  About the offering
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    label={telegramPageDetail.category}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 193, 7, 0.2)',
                      color: '#FFC107',
                      mr: 1
                    }}
                  />
                  <Chip
                    label={`${telegramPageDetail.plans.length} Plans`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(76, 175, 80, 0.2)',
                      color: '#4CAF50'
                    }}
                  />
                </Box>

                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                  {telegramPageDetail.title || 'Your Page Title'}
                </Typography>

                <Typography variant="body1" color="grey.300" sx={{ mb: 3 }}>
                  {telegramPageDetail.description || 'Your page description will appear here...'}
                </Typography>

                {/* {preview && ( */}
                <Box sx={{ mb: 3 }}>
                  <img
                    src={telegramPageDetail?.imageUrl}
                    alt="Thumbnail"
                    style={{
                      width: '100%',
                      borderRadius: 8,
                      maxHeight: 200,
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                {/* )} */}

                <Typography variant="body2" color="grey.400" sx={{ mt: 1 }}>
                  Disclaimer
                </Typography>
                <Typography variant="caption" color="grey.500">
                  By using our services, you agree to our terms and conditions. Content is for educational purposes only.
                </Typography>
              </Paper>
            </Grid>

            {/* Right Section - Plan Selection */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, borderRadius: 3 }} elevation={3}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #FF6B35 30%, #F7931E 90%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      position: 'relative'
                    }}
                  >
                    <Typography variant="h6" color="white" fontWeight="bold">
                      VIP
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        backgroundColor: '#FFC107',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      👑
                    </Box>
                  </Box>
                  <Typography variant="h5" fontWeight="bold">
                    {telegramPageDetail.title || 'VIP GROUP'} 🔥
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 2 }}>
                  Select a plan and continue
                </Typography>

                {telegramPageDetail.plans.length > 0 ? (
                  <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                    {telegramPageDetail.plans.map((plan, index) => {
                      const finalPrice = plan.price - plan.discount;
                      const hasDiscount = plan.discount > 0;

                      return (
                        <Paper
                          key={index}
                          sx={{
                            p: 2,
                            mb: 2,
                            background:
                              selectedPlan === index.toString()
                                ? 'linear-gradient(90deg, #4A90E2 0%, #357ABD 100%)'
                                : 'linear-gradient(90deg, #6C7B8B 0%, #4F5F6F 100%)',
                            color: 'white',
                            borderRadius: 3,
                            cursor: 'pointer',
                            border: selectedPlan === index.toString() ? '2px solid #FFD700' : 'none',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => setSelectedPlan(index.toString())}
                        >
                          <FormControlLabel
                            value={index.toString()}
                            control={<Radio sx={{ color: 'white' }} />}
                            label={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Box>
                                  <Typography variant="h6" fontWeight="bold">
                                    {plan.totalNumber} {plan.value}
                                  </Typography>
                                  {/* <Typography variant="body2">
                                  {plan.totalNumber}
                                </Typography> */}
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  {hasDiscount && (
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        textDecoration: 'line-through',
                                        color: 'rgba(255,255,255,0.7)',
                                        fontSize: '0.9rem'
                                      }}
                                    >
                                      ₹{plan.price}
                                    </Typography>
                                  )}
                                  <Typography variant="h6" fontWeight="bold">
                                    ₹{finalPrice.toFixed(2)}
                                    {hasDiscount && (
                                      <Typography variant="caption" display="block" color="#FFD700">
                                        Save ₹{plan.discount}
                                      </Typography>
                                    )}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            sx={{ margin: 0, width: '100%' }}
                          />
                        </Paper>
                      );
                    })}
                  </RadioGroup>
                ) : (
                  <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5', borderRadius: 3 }}>
                    <Typography color="textSecondary">No plans available. Please add some plans first.</Typography>
                  </Paper>
                )}

                {telegramPageDetail.plans.length > 0 && (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!selectedPlan}
                    sx={{
                      mt: 3,
                      py: 1.5,
                      background: selectedPlan ? 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)' : 'grey',
                      '&:hover': {
                        background: selectedPlan ? 'linear-gradient(45deg, #45a049 30%, #4CAF50 90%)' : 'grey'
                      },
                      fontWeight: 'bold'
                    }}
                  >
                    {telegramPageDetail.buttonText}
                  </Button>
                )}

                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                  Guaranteed safe & secure payment
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
