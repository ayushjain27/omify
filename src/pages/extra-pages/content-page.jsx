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
  Chip,
  Alert,
  CardContent,
  CardMedia,
  alpha,
  CircularProgress
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { createUserPaymentDetailsApi, getPaymentPageDetailByIdApi } from '../../store/payment-page/paymentPageApi';
import {
  CheckCircle,
  Security,
  Receipt,
  Verified,
  Lock,
  MonetizationOn,
  ArrowForward,
  Star,
  QrCode,
  Share,
  Visibility,
  AttachFile,
  PictureAsPdf,
  Description,
  TableChart,
  Videocam
} from '@mui/icons-material';

// Custom theme colors matching CreatePaymentPage
const elegantTheme = {
  primary: '#7C3AED', // Purple
  secondary: '#10B981', // Emerald
  accent: '#F59E0B', // Amber
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B'
};

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
  const [submitting, setSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPaymentPageDetailByIdApi({ id }));
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      let reqBody = { ...values };
      reqBody.paymentAmount = paymentPageDetail?.price;
      reqBody.paymentId = paymentPageDetail?._id;
      reqBody.userName = paymentPageDetail?.userName;
      
      await dispatch(createUserPaymentDetailsApi(reqBody));
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Payment submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderFileIcon = (fileUrl) => {
    if (!fileUrl) return null;
    const fileExt = fileUrl.split('.').pop().toLowerCase();
    const iconProps = { sx: { fontSize: 40, mr: 2 } };
    
    switch (fileExt) {
      case 'pdf': return <PictureAsPdf sx={{ color: '#EF4444', ...iconProps }} />;
      case 'doc':
      case 'docx': return <Description sx={{ color: '#3B82F6', ...iconProps }} />;
      case 'xls':
      case 'xlsx': return <TableChart sx={{ color: '#10B981', ...iconProps }} />;
      case 'mp4': return <Videocam sx={{ color: '#8B5CF6', ...iconProps }} />;
      default: return <AttachFile sx={{ color: '#6B7280', ...iconProps }} />;
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: { xs: 2, md: 4 },
      px: { xs: 1, md: 3 }
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />
      
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Success Message */}
        {paymentSuccess && (
          <Fade in={paymentSuccess}>
            <Alert 
              severity="success" 
              sx={{ 
                mb: 3, 
                borderRadius: 3,
                border: `1px solid ${alpha('#10B981', 0.3)}`,
                bgcolor: alpha('#10B981', 0.1),
                color: '#065F46',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <Typography variant="h6" fontWeight="600">
                ✅ Payment Successful!
              </Typography>
              <Typography variant="body2">
                Thank you for your payment. You'll receive a confirmation email shortly.
              </Typography>
            </Alert>
          </Fade>
        )}

        {/* Hero Section */}
        <Box sx={{
          height: { xs: 250, md: 350 },
          background: paymentPageDetail?.imageUrl 
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${paymentPageDetail.imageUrl})`
            : `linear-gradient(135deg, ${elegantTheme.primary} 0%, ${elegantTheme.secondary} 100%)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          mb: 4,
          mx: { xs: 1, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Animated background elements */}
          <Box sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }} />
          
          <Box sx={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)'
          }} />

          <Box sx={{ 
            textAlign: 'center', 
            color: 'white',
            px: { xs: 2, md: 4 },
            py: { xs: 3, md: 6 },
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: 900,
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}>
            <Chip 
              label={paymentPageDetail?.category || 'Premium'} 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', md: '0.875rem' }
              }}
            />
            
            <Typography variant="h1" fontWeight="800" gutterBottom sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              lineHeight: 1.2
            }}>
              {paymentPageDetail?.pageTitle || 'Premium Access'}
            </Typography>
            
            <Typography variant="h5" sx={{ 
              opacity: 0.9,
              mb: 4,
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}>
              by {paymentPageDetail?.userDetails?.name || 'Professional Service'}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={<Security sx={{ color: 'white', fontSize: 16 }} />}
                label="Secure Payment" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: { xs: '0.7rem', md: '0.875rem' }
                }}
              />
              <Chip 
                icon={<Receipt sx={{ color: 'white', fontSize: 16 }} />}
                label="Instant Access" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: { xs: '0.7rem', md: '0.875rem' }
                }}
              />
              <Chip 
                icon={<Verified sx={{ color: 'white', fontSize: 16 }} />}
                label="Money Back Guarantee" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: { xs: '0.7rem', md: '0.875rem' }
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ px: { xs: 1, md: 4 } }}>
          <Grid container spacing={4} maxWidth="lg" sx={{ mx: 'auto' }}>
            {/* Left Content Section */}
            <Grid item xs={12} md={7}>
              <Grow in={true} timeout={800}>
                <Paper sx={{ 
                  p: { xs: 2, md: 4 }, 
                  borderRadius: 3,
                  bgcolor: '#F8FAFC',
                  height: '100%',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  border: `1px solid ${alpha(elegantTheme.primary, 0.1)}`
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: { xs: 56, md: 70 },
                        height: { xs: 56, md: 70 },
                        bgcolor: elegantTheme.primary,
                        mr: 3,
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        fontWeight: 'bold',
                        boxShadow: `0 4px 20px ${alpha(elegantTheme.primary, 0.3)}`
                      }}
                    >
                      {paymentPageDetail?.userDetails?.name?.charAt(0) || 'P'}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="700" gutterBottom>
                        {paymentPageDetail?.userDetails?.name || 'Your Brand'}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography variant="body2" color="text.secondary">
                          ⭐⭐⭐⭐⭐ 4.9 (128 reviews)
                        </Typography>
                        <Chip 
                          size="small" 
                          label="Verified Seller" 
                          color="success" 
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 4, borderColor: '#E2E8F0' }} />

                  <Typography variant="h5" fontWeight="700" gutterBottom color={elegantTheme.text}>
                    What You'll Get
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ 
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: { xs: '0.875rem', md: '1.1rem' }
                  }}>
                    {paymentPageDetail?.description || 'Get instant access to premium content, exclusive resources, and valuable insights...'}
                  </Typography>

                  {/* Features List */}
                  <Box sx={{ 
                    bgcolor: alpha(elegantTheme.primary, 0.05),
                    borderRadius: 2,
                    p: 3,
                    mb: 4
                  }}>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      🎁 Included Features
                    </Typography>
                    <Grid container spacing={2}>
                      {['Instant Access', 'Lifetime Updates', '24/7 Support', 'Mobile Friendly', 'Downloadable Resources', 'Premium Quality'].map((feature, index) => (
                        <Grid item xs={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CheckCircle sx={{ 
                              color: elegantTheme.secondary, 
                              fontSize: { xs: 16, md: 20 }, 
                              mr: 1 
                            }} />
                            <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                              {feature}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* File Preview if exists */}
                  {paymentPageDetail?.fileUrl && (
                    <Fade in={true}>
                      <Alert 
                        severity="info"
                        icon={<AttachFile />}
                        sx={{ 
                          borderRadius: 2,
                          bgcolor: alpha('#3B82F6', 0.1),
                          color: '#1E40AF',
                          border: `1px solid ${alpha('#3B82F6', 0.2)}`,
                          alignItems: 'center'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          {renderFileIcon(paymentPageDetail.fileUrl)}
                          <Box>
                            <Typography variant="body2" fontWeight="600">
                              File Included: {paymentPageDetail.fileUrl.split('/').pop()}
                            </Typography>
                            <Typography variant="caption">
                              Download after payment
                            </Typography>
                          </Box>
                        </Box>
                      </Alert>
                    </Fade>
                  )}
                </Paper>
              </Grow>
            </Grid>

            {/* Right Payment Form Section */}
            <Grid item xs={12} md={5}>
              <Fade in={true} timeout={1200}>
                <Paper sx={{ 
                  p: { xs: 2, md: 4 }, 
                  borderRadius: 3,
                  bgcolor: 'white',
                  border: `1px solid ${alpha(elegantTheme.primary, 0.1)}`,
                  boxShadow: `0 10px 40px ${alpha(elegantTheme.primary, 0.1)}`,
                  height: '100%',
                  position: 'sticky',
                  top: 20
                }}>
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
                        <Typography variant="h4" fontWeight="800" gutterBottom color={elegantTheme.text}>
                          Complete Payment
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                          Enter your details to get instant access
                        </Typography>

                        <Stack spacing={3}>
                          {/* Name Field */}
                          <Box>
                            <InputLabel htmlFor="name" sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1 }}>
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
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  borderColor: alpha(elegantTheme.primary, 0.3),
                                  '&:hover': {
                                    borderColor: elegantTheme.primary
                                  }
                                }
                              }}
                            />
                            {touched.name && errors.name && (
                              <FormHelperText error sx={{ mt: 0.5 }}>
                                {errors.name}
                              </FormHelperText>
                            )}
                          </Box>

                          {/* Email Field */}
                          <Box>
                            <InputLabel htmlFor="email" sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1 }}>
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
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  borderColor: alpha(elegantTheme.primary, 0.3)
                                }
                              }}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText error sx={{ mt: 0.5 }}>
                                {errors.email}
                              </FormHelperText>
                            )}
                          </Box>

                          {/* Phone Number Field */}
                          <Box>
                            <InputLabel htmlFor="phoneNumber" sx={{ fontWeight: 'medium', color: 'text.primary', mb: 1 }}>
                              Phone Number*
                            </InputLabel>
                            <OutlinedInput
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Enter your phone number"
                              fullWidth
                              value={values.phoneNumber}
                              onChange={(e) => {
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
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                maxLength: 10
                              }}
                              sx={{
                                borderRadius: 2,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2,
                                  borderColor: alpha(elegantTheme.primary, 0.3)
                                }
                              }}
                            />
                            {touched.phoneNumber && errors.phoneNumber && (
                              <FormHelperText error sx={{ mt: 0.5 }}>
                                {errors.phoneNumber}
                              </FormHelperText>
                            )}
                          </Box>
                        </Stack>

                        {/* Price Display */}
                        <Box sx={{ 
                          mt: 4, 
                          p: 3, 
                          bgcolor: alpha(elegantTheme.primary, 0.05),
                          borderRadius: 2,
                          textAlign: 'center',
                          border: `1px solid ${alpha(elegantTheme.primary, 0.1)}`
                        }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Total Amount
                          </Typography>
                          <Typography variant="h1" fontWeight="800" color={elegantTheme.primary}>
                            ₹{paymentPageDetail?.price || '0'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            All taxes included • No hidden fees
                          </Typography>
                        </Box>

                        {/* Payment Methods */}
                        <Box sx={{ mt: 3, mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Accepted Payment Methods:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {['💳 Credit Card', '🏦 Debit Card', '📱 UPI', '💰 Net Banking', '🎴 PayPal'].map((method) => (
                              <Chip 
                                key={method}
                                label={method}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 1, fontSize: '0.75rem' }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* Submit Button */}
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          type="submit"
                          disabled={isSubmitting}
                          sx={{
                            mt: 2,
                            py: 2,
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${elegantTheme.primary} 0%, ${elegantTheme.secondary} 100%)`,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 25px ${alpha(elegantTheme.primary, 0.4)}`
                            },
                            '&:disabled': {
                              background: '#CBD5E1'
                            },
                            transition: 'all 0.3s'
                          }}
                          endIcon={isSubmitting ? 
                            <CircularProgress size={20} color="inherit" /> : 
                            <ArrowForward />
                          }
                        >
                          {isSubmitting ? 'Processing...' : `${paymentPageDetail?.buttonText || 'Pay Now'} - ₹${paymentPageDetail?.price || '0'}`}
                        </Button>

                        {/* Security Badge */}
                        <Box sx={{ 
                          mt: 3, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          gap: 1
                        }}>
                          <Lock sx={{ fontSize: 16, color: '#10B981' }} />
                          <Typography variant="caption" color="text.secondary">
                            🔒 256-bit SSL Secured • Your data is protected
                          </Typography>
                        </Box>
                      </form>
                    )}
                  </Formik>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom Stats */}
        <Box sx={{ 
          mt: 4, 
          px: { xs: 1, md: 4 },
          display: 'flex', 
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap'
        }}>
          <Chip 
            icon={<QrCode sx={{ color: 'white' }} />}
            label="QR Code Available" 
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          />
          <Chip 
            icon={<Share sx={{ color: 'white' }} />}
            label="Easy to Share" 
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          />
          <Chip 
            icon={<Visibility sx={{ color: 'white' }} />}
            label="Mobile Optimized" 
            variant="outlined"
            sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
          />
        </Box>
      </Box>
    </Box>
  );
}