// material-ui
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  IconButton,
  MenuItem,
  Grid,
  Paper,
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
  Avatar,
  colors,
  Grow,
  Fade,
  Zoom,
  CircularProgress,
  Chip,
  Alert,
  CardContent,
  CardMedia,
  Tooltip,
  FormControl,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  alpha,
  useMediaQuery
} from '@mui/material';
import {
  CloudUpload,
  PictureAsPdf,
  Description,
  TableChart,
  Image,
  Videocam,
  AttachFile,
  CheckCircle,
  Info,
  Cancel,
  ArrowForward,
  AddPhotoAlternate,
  PriceChange,
  Category,
  Title,
  Link as LinkIcon,
  ShoppingBag,
  Visibility,
  Edit,
  Palette,
  Security,
  MonetizationOn,
  Receipt,
  QrCode,
  Share,
  Lock,
  Star,
  Verified,
  Diamond
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentApi, uploadFileApi, uploadThumbnailApi } from '../../store/payment-page/paymentPageApi';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

// Custom theme colors
const elegantTheme = {
  primary: '#7C3AED', // Purple
  secondary: '#10B981', // Emerald
  accent: '#F59E0B', // Amber
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B'
};

export default function CreatePaymentPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [file, setFile] = useState(null);
  const [anyFile, setAnyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [anyPreview, setAnyPreview] = useState(null);
  const [fileType, setFileType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    price: '',
    pageTitle: '',
    category: 'Finance',
    description: '',
    buttonText: 'Pay Now',
    phoneNumber: '',
    link: '',
    themeColor: elegantTheme.primary
  });

  const steps = ['Content', 'Design', 'Preview'];

  const handleSubmit = async () => {
    if (!file) {
      enqueueSnackbar('Upload a thumbnail image', { 
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      return;
    }
    if (!data.pageTitle) {
      enqueueSnackbar('Page title is required', { 
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      return;
    }
    if (!data.description) {
      enqueueSnackbar('Description is required', { 
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      return;
    }
    if (!data.price) {
      enqueueSnackbar('Please set a price', { 
        variant: 'warning',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      return;
    }

    const requestData = {
      ...data,
      userName: selectedUserDetails?.userName
    };
    
    setLoading(true);
    try {
      let response = await dispatch(createPaymentApi(requestData));
      response = unwrapResult(response);
      let paymentPageId = response?._id;
      
      await handleUpload(paymentPageId);
      if (anyFile) {
        await handleAnyFileUpload(paymentPageId);
      }
      
      enqueueSnackbar('✨ Payment page created successfully!', { 
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setTimeout(() => {
        setLoading(false);
        navigate('/payment-page');
      }, 1500);
    } catch (error) {
      enqueueSnackbar(`Failed: ${error.message || 'Unknown error'}`, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' }
      });
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      enqueueSnackbar('Thumbnail uploaded!', { variant: 'success' });
    }
  };

  const handleAnyfileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'mp4', 'jpg', 'jpeg', 'png'];
    
    if (!allowedExtensions.includes(fileExt)) {
      enqueueSnackbar('Please upload supported files only', { variant: 'error' });
      return;
    }
    
    setAnyFile(selectedFile);
    setFileType(fileExt);
    
    if (selectedFile.type.startsWith('image/') || fileExt === 'mp4') {
      setAnyPreview(URL.createObjectURL(selectedFile));
    } else {
      setAnyPreview(null);
    }
    
    enqueueSnackbar(`📁 ${selectedFile.name} uploaded`, { variant: 'success' });
  };

  const handleUpload = async (paymentPageId) => {
    const formData = new FormData();
    formData.append('paymentPageId', paymentPageId);
    formData.append('image', file);

    setUploading(true);

    console.log(formData, 'dlemrnje');
    console.log('FormData contents:');

    try {
      await dispatch(uploadThumbnailApi(formData));
      // enqueueSnackbar('Thumbnail uploaded successfully', {
      //   variant: 'success'
      // });
    } catch (error) {
      enqueueSnackbar(`Failed to upload the file. ${error || error.message}`, {
        variant: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAnyFileUpload = async (paymentPageId) => {
    if (!anyFile) {
      enqueueSnackbar('Please select a file', {
        variant: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('paymentPageId', paymentPageId);
    formData.append('image', anyFile);
    console.log(anyFile, 'anyFile');
    try {
      await dispatch(uploadFileApi(formData));
      // enqueueSnackbar('File Uploaded successfully', {
      //   variant: 'success'
      // });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Failed to upload the file. ${error || error.message}`, {
        variant: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const renderFileIcon = (type) => {
    const iconProps = { sx: { fontSize: 40 } };
    switch (type) {
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
      p: { xs: 1, md: 3 }
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

      {/* Main Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header with Glass Effect */}
        <Paper sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ 
                background: 'linear-gradient(135deg, #7C3AED 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}>
                Create Payment Page
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <Diamond sx={{ fontSize: 16, mr: 1, color: elegantTheme.accent }} />
                Design beautiful payment pages in minutes
              </Typography>
            </Box>
            <Chip 
              icon={<Star sx={{ color: '#F59E0B' }} />}
              label="Premium" 
              sx={{ 
                bgcolor: 'rgba(245, 158, 11, 0.1)',
                color: '#92400E',
                fontWeight: 600
              }}
            />
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Panel - Creation Form */}
          <Grid item xs={12} md={5} lg={4}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: 3,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              overflow: 'auto',
              '&::-webkit-scrollbar': { display: 'none' }
            }}>
              {/* Progress Stepper */}
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: 600,
                        color: elegantTheme.text
                      }
                    }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step Navigation */}
              <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                {steps.map((_, index) => (
                  <Button
                    key={index}
                    variant={activeStep === index ? "contained" : "outlined"}
                    onClick={() => setActiveStep(index)}
                    sx={{
                      flex: 1,
                      borderRadius: 2,
                      py: 1,
                      fontWeight: 600,
                      bgcolor: activeStep === index ? elegantTheme.primary : 'transparent',
                      borderColor: elegantTheme.primary,
                      color: activeStep === index ? 'white' : elegantTheme.primary,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3
                      },
                      transition: 'all 0.3s'
                    }}
                  >
                    {steps[index]}
                  </Button>
                ))}
              </Stack>

              {/* File Upload Card */}
              <Card sx={{ 
                mb: 4, 
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(elegantTheme.primary, 0.1)} 0%, ${alpha(elegantTheme.secondary, 0.1)} 100%)`,
                border: `2px dashed ${alpha(elegantTheme.primary, 0.3)}`,
                transition: 'all 0.4s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  borderColor: elegantTheme.primary,
                  boxShadow: `0 12px 40px ${alpha(elegantTheme.primary, 0.2)}`
                }
              }}>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <CloudUpload sx={{ 
                    fontSize: 56, 
                    color: elegantTheme.primary,
                    mb: 2 
                  }} />
                  <Typography variant="h6" fontWeight="700" gutterBottom>
                    Upload Your Content
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Drag & drop files or click to browse
                  </Typography>
                  
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{
                      bgcolor: elegantTheme.primary,
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: alpha(elegantTheme.primary, 0.9),
                        transform: 'scale(1.05)'
                      }
                    }}
                  >
                    Browse Files
                    <input 
                      hidden 
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.mp4,.jpg,.jpeg,.png" 
                      type="file" 
                      onChange={handleAnyfileChange} 
                    />
                  </Button>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Supports: PDF, DOC, XLS, MP4, JPG, PNG • Max 50MB
                  </Typography>
                </CardContent>
              </Card>

              {/* Form Section */}
              <Box sx={{ '& .MuiTextField-root': { mb: 3 } }}>
                {/* Page Title with Counter */}
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Title sx={{ mr: 1, color: elegantTheme.primary }} />
                        <Typography variant="body1" fontWeight="600">
                          Page Title
                        </Typography>
                      </Box>
                    }
                    value={data.pageTitle}
                    onChange={(e) => setData({...data, pageTitle: e.target.value})}
                    placeholder="e.g., Premium Course Access"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        borderColor: alpha(elegantTheme.primary, 0.3),
                        '&:hover': {
                          borderColor: elegantTheme.primary
                        }
                      }
                    }}
                  />
                  <Chip 
                    label={`${data.pageTitle.length}/50`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      bgcolor: alpha(elegantTheme.primary, 0.1),
                      color: elegantTheme.primary
                    }}
                  />
                </Box>

                {/* Description */}
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={data.description}
                  onChange={(e) => setData({...data, description: e.target.value})}
                  placeholder="Describe what customers will get..."
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      borderColor: alpha(elegantTheme.primary, 0.3)
                    }
                  }}
                />

                {/* Price Input */}
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    type="number"
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <MonetizationOn sx={{ mr: 1, color: elegantTheme.accent }} />
                        <Typography variant="body1" fontWeight="600">
                          Price
                        </Typography>
                      </Box>
                    }
                    value={data.price}
                    onChange={(e) => setData({...data, price: e.target.value})}
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="h6" color={elegantTheme.accent} fontWeight="700">
                            ₹
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        borderColor: alpha(elegantTheme.accent, 0.3)
                      }
                    }}
                  />
                  <Chip 
                    icon={<Receipt />}
                    label="Tax included"
                    size="small"
                    sx={{
                      position: 'absolute',
                      right: 10,
                      top: 10,
                      bgcolor: alpha(elegantTheme.accent, 0.1),
                      color: elegantTheme.accent
                    }}
                  />
                </Box>

                {/* Category Select */}
                <TextField
                  fullWidth
                  select
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Category sx={{ mr: 1, color: elegantTheme.secondary }} />
                      <Typography variant="body1" fontWeight="600">
                        Category
                      </Typography>
                    </Box>
                  }
                  value={data.category}
                  onChange={(e) => setData({...data, category: e.target.value})}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      borderColor: alpha(elegantTheme.secondary, 0.3)
                    }
                  }}
                >
                  {['Finance', 'Health & Fitness', 'Education', 'Entertainment', 'Technology', 'Business', 'Creative', 'Other'].map((option) => (
                    <MenuItem key={option} value={option} sx={{ borderRadius: 1 }}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

                {/* Thumbnail Upload */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="600" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <AddPhotoAlternate sx={{ mr: 1, color: elegantTheme.primary }} />
                    Thumbnail Image
                  </Typography>
                  <Card
                    sx={{
                      border: `2px dashed ${preview ? elegantTheme.secondary : alpha(elegantTheme.primary, 0.3)}`,
                      borderRadius: 2,
                      p: 3,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: preview ? alpha(elegantTheme.secondary, 0.05) : 'transparent',
                      transition: 'all 0.3s',
                      '&:hover': {
                        borderColor: elegantTheme.primary,
                        transform: 'translateY(-2px)'
                      }
                    }}
                    component="label"
                  >
                    <input hidden accept=".jpg,.jpeg,.png" type="file" onChange={handleFileChange} />
                    {preview ? (
                      <Box>
                        <CardMedia
                          component="img"
                          image={preview}
                          sx={{
                            height: 140,
                            borderRadius: 2,
                            mb: 2,
                            objectFit: 'cover',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Button 
                          size="small" 
                          startIcon={<Edit />}
                          sx={{ color: elegantTheme.primary }}
                        >
                          Change Image
                        </Button>
                      </Box>
                    ) : (
                      <Box>
                        <AddPhotoAlternate sx={{ fontSize: 48, color: alpha(elegantTheme.primary, 0.5), mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Click to upload thumbnail
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          1280x720 recommended • Max 5MB
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </Box>

                {/* Submit Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 2,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${elegantTheme.primary} 0%, ${elegantTheme.secondary} 100%)`,
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 30px ${alpha(elegantTheme.primary, 0.4)}`
                    },
                    '&:disabled': {
                      background: '#CBD5E1'
                    },
                    transition: 'all 0.3s'
                  }}
                  startIcon={loading ? 
                    <CircularProgress size={24} color="inherit" /> : 
                    <CheckCircle sx={{ fontSize: 24 }} />
                  }
                >
                  {loading ? 'Creating...' : '✨ Publish Payment Page'}
                </Button>

                {/* Security Badge */}
                <Box sx={{ 
                  mt: 3, 
                  p: 2, 
                  borderRadius: 2,
                  bgcolor: alpha('#10B981', 0.1),
                  border: `1px solid ${alpha('#10B981', 0.2)}`,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Lock sx={{ color: '#10B981', mr: 2 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="600" color="#065F46">
                      Secure & Encrypted
                    </Typography>
                    <Typography variant="caption" color="#047857">
                      Your payment page is protected with 256-bit SSL encryption
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Right Panel - Live Preview */}
          <Grid item xs={12} md={7} lg={8}>
            <Paper sx={{ 
              height: '100%', 
              borderRadius: 3,
              overflow: 'hidden',
              background: 'transparent',
              boxShadow: 'none'
            }}>
              {/* Preview Header */}
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5" fontWeight="700" sx={{ 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Visibility sx={{ mr: 1.5 }} />
                  Live Preview
                </Typography>
                <Chip 
                  icon={<Verified sx={{ color: '#10B981' }} />}
                  label="Real-time" 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </Box>

              {/* Preview Container */}
              <Box sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
                transform: 'translateY(0)',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                {/* Hero Section with Gradient */}
                <Box sx={{
                  height: 350,
                  background: preview 
                    ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${preview})`
                    : `linear-gradient(135deg, ${elegantTheme.primary} 0%, ${elegantTheme.secondary} 100%)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
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
                    px: 4,
                    py: 6,
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
                      label={data.category || 'Premium'} 
                      sx={{ 
                        mb: 3, 
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                    
                    <Typography variant="h1" fontWeight="800" gutterBottom sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {data.pageTitle || 'Premium Access'}
                    </Typography>
                    
                    <Typography variant="h5" sx={{ 
                      opacity: 0.9,
                      mb: 4,
                      fontWeight: 300
                    }}>
                      by {selectedUserDetails?.name || 'Your Brand'}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        icon={<Security />}
                        label="Secure Payment" 
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }}
                      />
                      <Chip 
                        icon={<Receipt />}
                        label="Instant Access" 
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }}
                      />
                      <Chip 
                        icon={<Verified />}
                        label="Money Back Guarantee" 
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white'
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Main Content Area */}
                <Box sx={{ 
                  bgcolor: 'white',
                  p: { xs: 3, md: 5 }
                }}>
                  <Grid container spacing={4}>
                    {/* Left Content */}
                    <Grid item xs={12} md={7}>
                      <Box sx={{ 
                        p: 4, 
                        borderRadius: 3,
                        bgcolor: '#F8FAFC',
                        height: '100%'
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                          <Avatar
                            sx={{
                              width: 70,
                              height: 70,
                              bgcolor: elegantTheme.primary,
                              mr: 3,
                              fontSize: '1.75rem',
                              fontWeight: 'bold',
                              boxShadow: `0 4px 20px ${alpha(elegantTheme.primary, 0.3)}`
                            }}
                          >
                            {selectedUserDetails?.name?.charAt(0) || 'B'}
                          </Avatar>
                          <Box>
                            <Typography variant="h5" fontWeight="700" gutterBottom>
                              {selectedUserDetails?.name || 'Your Brand'}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                          fontSize: '1.1rem'
                        }}>
                          {data.description || 'Get instant access to premium content, exclusive resources, and valuable insights...'}
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
                            {['Instant Access', 'Lifetime Updates', '24/7 Support', 'Mobile Friendly', 'Downloadable Resources'].map((feature, index) => (
                              <Grid item xs={6} key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <CheckCircle sx={{ 
                                    color: elegantTheme.secondary, 
                                    fontSize: 20, 
                                    mr: 1 
                                  }} />
                                  <Typography variant="body2">
                                    {feature}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        {/* File Preview */}
                        {anyFile && (
                          <Alert 
                            severity="info"
                            icon={<AttachFile />}
                            sx={{ 
                              borderRadius: 2,
                              bgcolor: alpha('#3B82F6', 0.1),
                              color: '#1E40AF',
                              border: `1px solid ${alpha('#3B82F6', 0.2)}`
                            }}
                          >
                            <Typography variant="body2" fontWeight="600">
                              File Included: {anyFile.name}
                            </Typography>
                          </Alert>
                        )}
                      </Box>
                    </Grid>

                    {/* Right Payment Form */}
                    <Grid item xs={12} md={5}>
                      <Box sx={{ 
                        p: 4, 
                        borderRadius: 3,
                        bgcolor: 'white',
                        border: `1px solid ${alpha(elegantTheme.primary, 0.1)}`,
                        boxShadow: `0 10px 40px ${alpha(elegantTheme.primary, 0.1)}`,
                        height: '100%',
                        position: 'sticky',
                        top: 20
                      }}>
                        <Typography variant="h4" fontWeight="800" gutterBottom color={elegantTheme.text}>
                          Complete Payment
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                          Enter your details to get instant access
                        </Typography>

                        <Stack spacing={3}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            size="medium"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                              }
                            }}
                          />
                          
                          <TextField
                            fullWidth
                            label="Email Address"
                            variant="outlined"
                            size="medium"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                              }
                            }}
                          />
                          
                          <TextField
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            size="medium"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2
                              }
                            }}
                          />
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
                            ₹{data.price || '0'}
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
                                sx={{ borderRadius: 1 }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* CTA Button */}
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
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
                            transition: 'all 0.3s'
                          }}
                          endIcon={<ArrowForward />}
                        >
                          {data.buttonText || 'Pay Now'} - ₹{data.price || '0'}
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
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Preview Stats */}
              <Box sx={{ 
                mt: 3, 
                display: 'flex', 
                justifyContent: 'center',
                gap: 3,
                flexWrap: 'wrap'
              }}>
                <Chip 
                  icon={<QrCode />}
                  label="QR Code Available" 
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                />
                <Chip 
                  icon={<Share />}
                  label="Easy to Share" 
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                />
                <Chip 
                  icon={<Visibility />}
                  label="Mobile Optimized" 
                  variant="outlined"
                  sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}