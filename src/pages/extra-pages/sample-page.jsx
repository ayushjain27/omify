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
  Zoom
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import axios from 'axios';
import { useNavigate } from 'react-router';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentApi, uploadFileApi, uploadThumbnailApi } from '../../store/payment-page/paymentPageApi';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [priceType, setPriceType] = useState('fixed');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [anyFile, setAnyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [anyPreview, setAnyPreview] = useState(null);
  const [fileType, setFileType] = useState('');
  const [uploading, setUploading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
  };

  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const [data, setData] = useState({
    price: '',
    pageTitle: '',
    category: 'Finance',
    description: '',
    buttonText: 'Make Payment',
    phoneNumber: '',
    link: ''
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file) {
      enqueueSnackbar('Please select a thumbnail file.', {
        variant: 'error'
      });
      return;
    }
    if (!data?.pageTitle) {
      enqueueSnackbar('Please select a Page Title.', {
        variant: 'error'
      });
      return;
    }
    if (!data?.description) {
      enqueueSnackbar('Please select a Page Desciption.', {
        variant: 'error'
      });
      return;
    }
    if (!data?.price) {
      enqueueSnackbar('Please select a Price.', {
        variant: 'error'
      });
      return;
    }
    const requestData = {
      ...data,
      userName: selectedUserDetails?.userName
    };
    let response = await dispatch(createPaymentApi(requestData));
    response = unwrapResult(response);
    let paymentPageId = response?._id;
    await handleUpload(paymentPageId);
    if (anyFile) {
      console.log('dmkeik');
      await handleAnyFileUpload(paymentPageId);
    }
    navigate('/payment-page');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    console.log(previewUrl, 'Demk');
    setPreview(previewUrl);
  };

  const handleAnyfileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const fileType = selectedFile.type;

    // Validate file type
    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'mp4', 'jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(fileExt)) {
      enqueueSnackbar('Please upload only PDF, Excel, Word, MP4, JPG, or PNG files', {
        variant: 'error'
      });
      return;
    }
    setAnyFile(selectedFile);
    setFileType(fileExt);

    // handleUpload(file);

    // Create a preview
    if (fileType.startsWith('image/') || fileExt === 'mp4') {
      const previewUrl = URL.createObjectURL(selectedFile);
      setAnyPreview(previewUrl);
    } else {
      // For documents, use icon preview
      setAnyPreview(null);
    }
  };

  const renderPreview = () => {
    if (!anyFile) return null;

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        return (
          <div>
            <Typography variant="h6">Uploaded Image:</Typography>
            <img src={anyPreview} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        );
      case 'mp4':
        return (
          <div>
            <Typography variant="h6">Uploaded Video:</Typography>
            <video controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
              <source src={anyPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div>
            <Typography variant="h6">Uploaded PDF:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <PictureAsPdfIcon color="error" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div>
            <Typography variant="h6">Uploaded Word Document:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <DescriptionIcon color="primary" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      case 'xls':
      case 'xlsx':
        return (
          <div>
            <Typography variant="h6">Uploaded Excel File:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <TableChartIcon color="success" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      default:
        return null;
    }
  };

  console.log(anyFile, ';fmkmekfke');

  const handleUpload = async (paymentPageId) => {
    const formData = new FormData();
    formData.append('paymentPageId', paymentPageId);
    formData.append('image', file);

    setUploading(true);

    console.log(formData, 'dlemrnje');
    console.log('FormData contents:');

    try {
      await dispatch(uploadThumbnailApi(formData));
      enqueueSnackbar('Thumbnail uploaded successfully', {
        variant: 'success'
      });
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
      enqueueSnackbar('File Uploaded successfully', {
        variant: 'success'
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Failed to upload the file. ${error || error.message}`, {
        variant: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          overflow: 'hidden', // Prevent scrolling
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1, // Takes remaining space
            overflow: 'hidden' // Prevent scrolling
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: '100%',
              overflow: 'auto', // Enable scrolling only inside this column
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              pb: 2 // Add some padding at bottom
            }}
          >
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Create Payment Page
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Upload your Digital Files
              </Typography>

              {/* File Upload Section */}
              <Card
                variant="outlined"
                sx={{
                  borderStyle: 'dashed',
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: '10px',
                  borderColor: '#E0E0E0'
                }}
              >
                <IconButton color="primary" component="label">
                  <CloudUpload />
                  <input hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.mp4,.jpg,.jpeg,.png" type="file" onChange={handleAnyfileChange} />
                </IconButton>
                <Typography variant="body1" sx={{ color: '#E91E63', fontWeight: 'bold', mb: 1 }}>
                  Upload files from your system
                </Typography>
                <Button component="label" sx={{ display: 'none' }} aria-label="Browse files">
                  <input type="file" hidden />
                </Button>
              </Card>
              {renderPreview()}
              <TextField
                label="Page Title"
                placeholder="Add Title"
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                helperText={data?.pageTitle?.length > 0 ? `${data?.pageTitle?.length}/50` : `0/50`}
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    pageTitle: event.target.value
                  }))
                }
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: event.target.value
                  }))
                }
                sx={{ mt: 0 }}
              />
              <TextField
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    link: event.target.value
                  }))
                }
                label="Add YouTube/Google Drive Link"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Add link to your files"
                sx={{ mt: 0 }}
              />

              {/* Pricing Section */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Set Pricing
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  // value={price}
                  onChange={(event) =>
                    setData((prevData) => ({
                      ...prevData,
                      price: event.target.value
                    }))
                  }
                  InputProps={{
                    startAdornment: <Typography sx={{ color: '#000', pr: 1 }}>₹</Typography>
                  }}
                  size="small"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderColor: '#B0B0B0'
                    }
                  }}
                />
              </Box>

              <Box>
                <Box component="form" noValidate autoComplete="off">
                  {/* Page Title */}

                  {/* Category Dropdown */}
                  <TextField
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue="Finance"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        category: event.target.value
                      }))
                    }
                    sx={{ mt: 0 }}
                  >
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                  </TextField>

                  <Typography variant="h5">Add Thumbnail for the page</Typography>
                  {/* Cover Image/Video */}
                  <Box border={1} borderColor="grey.400" borderRadius={1} p={2} textAlign="center" mt={1} mb={2}>
                    <IconButton color="primary" component="label">
                      <CloudUpload />
                      <input hidden accept=".jpg,.jpeg,.png" type="file" onChange={handleFileChange} />
                    </IconButton>
                    {/* <Typography></Typography> */}
                    <Typography variant="body2" color="textSecondary">
                      Browse files from your system
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      1280 x 720 (16:9) recommended
                    </Typography>
                  </Box>
                  {/* {preview && (
                    <div>
                      <h3>Uploaded Image:</h3>
                      <img src={preview} alt="Uploaded" style={{ maxWidth: '300px' }} />
                    </div>
                  )} */}

                  {/* Description */}

                  {/* Button Text */}
                  <TextField
                    label="Button Text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue="Make Payment"
                    inputProps={{ maxLength: 15 }}
                    helperText="12/15"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        buttonText: event.target.value
                      }))
                    }
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#333333' },
                  height: 48,
                  borderRadius: 2
                }}
                onClick={handleSubmit}
              >
                Save and Continue
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              height: '100%',
              overflow: 'auto', // Enable scrolling only inside this column
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
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
                  backgroundImage: !data?.imageUrl ? `url(${data.imageUrl})` : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
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
                  {data?.pageTitle || 'Payment Page'}
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
                            {selectedUserDetails?.name?.slice(0, 1) || 'P'}
                          </Avatar>
                          <Typography variant="h5" fontWeight="bold" color="primary">
                            {selectedUserDetails?.name || 'Payment Request'}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />

                        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                          About This Payment
                        </Typography>

                        {preview && (
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
                                src={preview}
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
                          {data?.description || 'Please complete your payment using the form on the right.'}
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
                            sx={{
                              borderRadius: 2,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0,0,0,0.1)'
                              }
                            }}
                          />
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
                            sx={{
                              borderRadius: 2,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0,0,0,0.1)'
                              }
                            }}
                          />
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
                            type="tel"
                            sx={{
                              borderRadius: 2,
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(0,0,0,0.1)'
                              }
                            }}
                          />
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
                            ₹ {data?.price || '0.00'}
                          </Typography>
                        </Box>

                        {/* Submit Button */}
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          type="submit"
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
                          {data?.buttonText || 'Pay Now'} →
                        </Button>

                        <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
                          Secure payment powered by your platform
                        </Typography>
                      </Paper>
                    </Fade>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
    // <MainCard title="Sample Card">
    //   <Typography variant="body2">
    //     Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
    //     minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
    //     reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
    //     officiate descent molls anim id est labours.
    //   </Typography>
    // </MainCard>
  );
}
