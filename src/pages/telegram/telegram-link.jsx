import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Avatar,
  Fade,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Modal,
  Backdrop,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
  Container,
  InputAdornment,
  LinearProgress
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addUserToChannelApi, getTelegramPageDetailsByIdApi } from '../../store/telegram/telegramApi';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Person,
  Telegram,
  Shield,
  TrendingUp,
  CheckCircle,
  LocalOffer,
  CalendarToday,
  Security,
  ArrowBack,
  Close,
  ContentCopy,
  InfoOutlined,
  Title,
  Description,
  Category
} from '@mui/icons-material';

// Validation Schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  border: 'none',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
};

export default function TelegramLink() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const dispatch = useDispatch();
  const { telegramPageDetail } = useSelector(({ telegramReducer }) => telegramReducer);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const [selectedPlan, setSelectedPlan] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTelegramPageDetailsByIdApi({ telegramId: id }));
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleJoinNow = () => {
    if (selectedPlan && telegramPageDetail.plans) {
      const plan = telegramPageDetail.plans[selectedPlan];
      setSelectedPlanDetails(plan);
      setModalOpen(true);
      setApiResponse(null);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setApiResponse(null);
    setLoading(false);
    setCopied(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setApiResponse(null);

    try {
      const newSelectedPlans = {
        ...selectedPlanDetails,
        joinDate: new Date()
      };

      const requestBody = {
        channelId: telegramPageDetail.channelId,
        phoneNumber: values.phoneNumber,
        username: telegramPageDetail?.userName,
        selectedPlan: newSelectedPlans
      };

      const response = await dispatch(addUserToChannelApi(requestBody)).unwrap();

      setApiResponse({
        success: true,
        invite_link: response.invite_link || response.message,
        message: response.message || 'Invite link generated successfully!'
      });
    } catch (error) {
      setApiResponse({
        success: false,
        error: error.response?.data || { error: 'Something went wrong' }
      });
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    phoneNumber: ''
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 3
      }}
    >
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                  ✨ Premium Telegram Channel
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Join this exclusive Telegram channel subscription
                </Typography>
              </Box>
              {telegramPageDetail?.category && (
                <Chip
                  icon={<Telegram />}
                  label={telegramPageDetail.category}
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 600
                  }}
                />
              )}
            </Box>

            <LinearProgress
              variant="determinate"
              value={selectedPlan ? 50 : 0}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                }
              }}
            />
          </Box>

          <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
            {/* Left Preview Section */}
            <Grid item xs={12} md={5} sx={{ height: '100%' }}>
              <Box
                sx={{
                  height: '100%',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '4px'
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#a8a8a8'
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Card
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                          src={telegramPageDetail?.imageUrl}
                          sx={{
                            width: 64,
                            height: 64,
                            mr: 2,
                            border: '3px solid',
                            borderColor: '#4f46e5',
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                          }}
                        >
                          {telegramPageDetail?.channelName?.[0] || 'T'}
                        </Avatar>
                        <Box>
                          <Chip
                            label="PREMIUM"
                            size="small"
                            sx={{
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              fontWeight: 'bold',
                              mb: 0.5
                            }}
                          />
                          <Typography variant="h6" fontWeight="bold" sx={{ color: '#1e293b' }}>
                            {telegramPageDetail?.channelName || 'Telegram Channel'}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" color="#64748b" sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" /> Created by
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              mr: 1.5,
                              bgcolor: '#4f46e5',
                              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.4)'
                            }}
                          >
                            {selectedUserDetails?.name?.[0] || 'U'}
                          </Avatar>
                          <Box>
                            <Typography variant="body1" fontWeight="medium" sx={{ color: '#1e293b' }}>
                              {selectedUserDetails?.name || 'User Name'}
                            </Typography>
                            <Typography variant="caption" color="#64748b">
                              Channel Admin
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2.5, borderColor: '#e2e8f0' }} />

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5, color: '#1e293b' }}>
                          {telegramPageDetail?.title || 'Premium Channel Access'}
                        </Typography>
                        <Typography variant="body2" color="#475569" paragraph sx={{ lineHeight: 1.7 }}>
                          {telegramPageDetail?.description || 'Join our exclusive community for premium content and insights...'}
                        </Typography>

                        {telegramPageDetail?.category && (
                          <Chip
                            label={telegramPageDetail.category}
                            sx={{
                              backgroundColor: '#e0e7ff',
                              color: '#3730a3',
                              fontWeight: 600,
                              px: 1.5,
                              py: 1
                            }}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          backgroundColor: '#f8fafc',
                          borderRadius: 2,
                          p: 2,
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5, color: '#1e293b' }}>
                          ✅ Premium Benefits:
                        </Typography>
                        <Stack spacing={1}>
                          {['Exclusive content access', 'Premium community access', 'Priority support', 'Early access to new features'].map(
                            (item, index) => (
                              <Typography
                                key={index}
                                variant="caption"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  color: '#475569'
                                }}
                              >
                                <CheckCircle fontSize="small" sx={{ color: '#10b981' }} /> {item}
                              </Typography>
                            )
                          )}
                        </Stack>
                      </Box>

                      <Alert
                        severity="info"
                        icon={<InfoOutlined />}
                        sx={{
                          mt: 3,
                          borderRadius: 2,
                          backgroundColor: '#f0f9ff',
                          color: '#0369a1',
                          border: '1px solid #bae6fd'
                        }}
                      >
                        <Typography variant="caption">
                          By using our services, you agree to our terms and conditions. Content is for educational purposes only.
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            </Grid>

            {/* Right Pricing Section */}
            <Grid item xs={12} md={7} sx={{ height: '100%' }}>
              <Box
                sx={{
                  height: '100%',
                  background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'rgba(255,255,255,0.05)'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px'
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'rgba(255,255,255,0.3)'
                  }
                }}
              >
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: 'white' }}>
                    📱 Select Your Plan
                  </Typography>

                  <Paper
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                      color: 'white',
                      height: '100%',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          mb: 2,
                          position: 'relative',
                          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4)'
                        }}
                      >
                        <Typography variant="h4" fontWeight="bold" color="#1e293b">
                          VIP
                        </Typography>
                        <Security
                          sx={{
                            position: 'absolute',
                            bottom: -5,
                            right: -5,
                            color: '#fbbf24',
                            fontSize: 24,
                            backgroundColor: '#1e293b',
                            borderRadius: '50%',
                            p: 0.5
                          }}
                        />
                      </Box>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                        {telegramPageDetail?.title || 'Premium Membership'} 🔥
                      </Typography>
                      <Typography variant="body2" color="#cbd5e1">
                        Choose your perfect subscription plan
                      </Typography>
                    </Box>

                    {telegramPageDetail?.plans?.length > 0 ? (
                      <>
                        <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                          <Stack spacing={2}>
                            {telegramPageDetail.plans.map((plan, index) => {
                              const finalPrice = plan.price - plan.discount;
                              const hasDiscount = plan.discount > 0;
                              const discountPercent = Math.round((plan.discount / plan.price) * 100);

                              return (
                                <Paper
                                  key={index}
                                  sx={{
                                    p: 2.5,
                                    background:
                                      selectedPlan === index.toString()
                                        ? 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)'
                                        : 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    border: selectedPlan === index.toString() ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.15)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    '&:hover': {
                                      background:
                                        selectedPlan === index.toString()
                                          ? 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)'
                                          : 'rgba(255, 255, 255, 0.12)',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                                    }
                                  }}
                                  onClick={() => setSelectedPlan(index.toString())}
                                >
                                  {hasDiscount && (
                                    <Chip
                                      label={`${discountPercent}% OFF`}
                                      size="small"
                                      sx={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '0.7rem',
                                        transform: 'rotate(15deg)'
                                      }}
                                    />
                                  )}
                                  <FormControlLabel
                                    value={index.toString()}
                                    control={
                                      <Radio
                                        sx={{
                                          color: 'rgba(255,255,255,0.7)',
                                          '&.Mui-checked': { color: '#f59e0b' }
                                        }}
                                      />
                                    }
                                    label={
                                      <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                          <Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                              {plan.totalNumber} {plan.value}
                                            </Typography>
                                            <Typography variant="caption" color="rgba(255,255,255,0.7)">
                                              Full access to all features
                                            </Typography>
                                          </Box>
                                          <Box sx={{ textAlign: 'right' }}>
                                            {hasDiscount && (
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  textDecoration: 'line-through',
                                                  color: 'rgba(255,255,255,0.5)'
                                                }}
                                              >
                                                ₹{plan.price}
                                              </Typography>
                                            )}
                                            <Typography variant="h5" fontWeight="bold">
                                              ₹{finalPrice.toFixed(2)}
                                            </Typography>
                                          </Box>
                                        </Box>
                                        {hasDiscount && (
                                          <Typography variant="caption" sx={{ color: '#f59e0b', display: 'block', fontWeight: 500 }}>
                                            🎉 Save ₹{plan.discount}
                                          </Typography>
                                        )}
                                      </Box>
                                    }
                                    sx={{ margin: 0, width: '100%' }}
                                  />
                                </Paper>
                              );
                            })}
                          </Stack>
                        </RadioGroup>

                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          disabled={!selectedPlan}
                          onClick={handleJoinNow}
                          sx={{
                            mt: 3,
                            py: 1.5,
                            background: selectedPlan ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' : 'rgba(255,255,255,0.1)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            borderRadius: 2,
                            boxShadow: selectedPlan ? '0 8px 32px rgba(16, 185, 129, 0.4)' : 'none',
                            '&:hover': {
                              background: selectedPlan ? 'linear-gradient(90deg, #059669 0%, #10b981 100%)' : 'rgba(255,255,255,0.15)',
                              transform: selectedPlan ? 'translateY(-2px)' : 'none'
                            }
                          }}
                        >
                          {telegramPageDetail?.buttonText || 'Join Now'} →
                        </Button>

                        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
                            <Box sx={{ textAlign: 'center' }}>
                              <Shield sx={{ color: '#60a5fa', fontSize: 20, mb: 0.5 }} />
                              <Typography variant="caption">Secure Payment</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                              <TrendingUp sx={{ color: '#34d399', fontSize: 20, mb: 0.5 }} />
                              <Typography variant="caption">Cancel Anytime</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                              <CheckCircle sx={{ color: '#f59e0b', fontSize: 20, mb: 0.5 }} />
                              <Typography variant="caption">30-Day Guarantee</Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </>
                    ) : (
                      <Paper
                        sx={{
                          p: 4,
                          textAlign: 'center',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: 2,
                          border: '1px dashed rgba(255,255,255,0.2)'
                        }}
                      >
                        <LocalOffer sx={{ fontSize: 56, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
                        <Typography variant="body1" color="rgba(255,255,255,0.7)">
                          No subscription plans available
                        </Typography>
                      </Paper>
                    )}
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" color="#1e293b">
                Join Premium Channel ✨
              </Typography>
              <IconButton
                onClick={handleCloseModal}
                size="small"
                sx={{
                  color: '#64748b',
                  '&:hover': { backgroundColor: '#f1f5f9' }
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {selectedPlanDetails && (
              <Card
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" color="#1e293b" gutterBottom>
                    📋 Selected Plan Details:
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight="bold" color="#4f46e5">
                        {selectedPlanDetails.totalNumber} {selectedPlanDetails.value}
                      </Typography>
                      <Typography variant="caption" color="#64748b">
                        Full premium access
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      {selectedPlanDetails.discount > 0 && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: '#94a3b8'
                          }}
                        >
                          ₹{selectedPlanDetails.price}
                        </Typography>
                      )}
                      <Typography variant="h5" fontWeight="bold" color="#10b981">
                        ₹{(selectedPlanDetails.price - selectedPlanDetails.discount).toFixed(2)}
                      </Typography>
                      {selectedPlanDetails.discount > 0 && (
                        <Typography variant="caption" color="#f59e0b" fontWeight="500">
                          🎉 Save ₹{selectedPlanDetails.discount}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {!apiResponse ? (
              <>
                <Typography variant="subtitle1" color="#475569" gutterBottom sx={{ mb: 2 }}>
                  <InfoOutlined sx={{ verticalAlign: 'middle', mr: 1, color: '#4f46e5' }} />
                  Enter phone number to generate invite link
                </Typography>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Stack spacing={3}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={(e) => {
                            // Allow only numbers and limit to 10 digits
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
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          disabled={loading}
                          placeholder="10 digit phone number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography color="textSecondary">+91</Typography>
                              </InputAdornment>
                            ),
                            inputProps: {
                              inputMode: 'numeric',
                              pattern: '[0-9]*'
                            }
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: '#4f46e5'
                              }
                            }
                          }}
                        />

                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={loading}
                          sx={{
                            py: 1.5,
                            borderRadius: 2,
                            fontWeight: 'bold',
                            background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                            boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #4338ca 0%, #6d28d9 100%)',
                              boxShadow: '0 6px 25px rgba(79, 70, 229, 0.5)'
                            }
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : '✨ Generate Invite Link'}
                        </Button>
                      </Stack>
                    </form>
                  )}
                </Formik>
              </>
            ) : (
              <Box>
                {apiResponse.success ? (
                  <Box>
                    <Alert
                      severity="success"
                      sx={{
                        mb: 3,
                        borderRadius: 2,
                        backgroundColor: '#f0fdf4',
                        color: '#166534',
                        border: '1px solid #bbf7d0'
                      }}
                    >
                      <Typography fontWeight="bold">🎉 Success!</Typography>
                      <Typography variant="body2">{apiResponse.message || 'Invite link generated successfully!'}</Typography>
                    </Alert>

                    {apiResponse.invite_link ? (
                      <Paper
                        sx={{
                          p: 3,
                          backgroundColor: '#f8fafc',
                          borderRadius: 2,
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom color="#1e293b">
                          📱 Your Exclusive Invite Link:
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              flex: 1,
                              wordBreak: 'break-all',
                              backgroundColor: 'white',
                              p: 1.5,
                              borderRadius: 1,
                              border: '1px solid #e2e8f0',
                              fontFamily: 'monospace',
                              fontSize: '0.9rem'
                            }}
                          >
                            {apiResponse.invite_link}
                          </Typography>
                          <IconButton
                            onClick={() => copyToClipboard(apiResponse.invite_link)}
                            sx={{
                              backgroundColor: '#f1f5f9',
                              '&:hover': { backgroundColor: '#e2e8f0' }
                            }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        </Box>
                        {copied && (
                          <Typography variant="caption" color="#10b981" sx={{ display: 'block', textAlign: 'center' }}>
                            ✓ Link copied to clipboard!
                          </Typography>
                        )}
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<Telegram />}
                          href={apiResponse.invite_link}
                          target="_blank"
                          sx={{
                            mt: 2,
                            borderRadius: 2,
                            borderColor: '#4f46e5',
                            color: '#4f46e5',
                            '&:hover': {
                              borderColor: '#4338ca',
                              backgroundColor: '#eef2ff'
                            }
                          }}
                        >
                          Open in Telegram
                        </Button>
                      </Paper>
                    ) : (
                      <Typography variant="body2" color="textSecondary" align="center">
                        {apiResponse.message}
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      backgroundColor: '#fef2f2',
                      color: '#991b1b',
                      border: '1px solid #fecaca'
                    }}
                  >
                    <Typography fontWeight="bold">❌ Error</Typography>
                    <Typography variant="body2">{apiResponse.error.error || 'Failed to generate invite link'}</Typography>
                    {apiResponse.error.details && (
                      <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                        {apiResponse.error.details}
                      </Typography>
                    )}
                  </Alert>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCloseModal}
                  sx={{
                    mt: 2,
                    py: 1.2,
                    borderRadius: 2,
                    background: 'linear-gradient(90deg, #64748b 0%, #475569 100%)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #475569 0%, #334155 100%)'
                    }
                  }}
                >
                  Close
                </Button>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
