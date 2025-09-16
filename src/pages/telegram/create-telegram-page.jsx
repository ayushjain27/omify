// material-ui
import React, { useState, useEffect } from 'react';
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
  FormControl,
  Select,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { CloudUpload, Add, Delete } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentApi, uploadFileApi, uploadThumbnailApi } from '../../store/payment-page/paymentPageApi';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';

// ==============================|| SAMPLE PAGE ||============================== //

export default function CreateTelegramPage() {
  const [priceType, setPriceType] = useState('fixed');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [anyFile, setAnyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [anyPreview, setAnyPreview] = useState(null);
  const [fileType, setFileType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
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
    buttonText: 'Join Now',
    phoneNumber: '',
    link: '',
    plans: []
  });

  // Plan management state
  const [newPlan, setNewPlan] = useState({
    duration: 1,
    durationType: 'day',
    price: '',
    discount: 0
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get channel data from navigation state
  console.log(location,"locarion")
  const channel = location.state?.channel;
  
  // Log channel data for debugging
  useEffect(() => {
    console.log("Channel data received:", channel);
    
    // If channel data is available, pre-fill the form
    if (channel) {
      setData(prevData => ({
        ...prevData,
        pageTitle: channel.title || channel.name || '',
        description: `Join ${channel.title || channel.name} for exclusive content`
      }));
    }
  }, [channel]);

  const handleAddPlan = () => {
    if (!newPlan.price) {
      enqueueSnackbar('Please enter a price for the plan', { variant: 'error' });
      return;
    }

    const planId = Date.now();
    const plan = {
      id: planId,
      duration: newPlan.duration,
      durationType: newPlan.durationType,
      price: parseFloat(newPlan.price),
      discount: parseFloat(newPlan.discount) || 0
    };

    setData((prevData) => ({
      ...prevData,
      plans: [...prevData.plans, plan]
    }));

    // Reset new plan form
    setNewPlan({
      duration: 1,
      durationType: 'day',
      price: '',
      discount: 0
    });

    enqueueSnackbar('Plan added successfully', { variant: 'success' });
  };

  const handleRemovePlan = (planId) => {
    setData((prevData) => ({
      ...prevData,
      plans: prevData.plans.filter((plan) => plan.id !== planId)
    }));

    // If the removed plan was selected, clear selection
    if (selectedPlan === planId.toString()) {
      setSelectedPlan('');
    }
  };

  const calculateFinalPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const formatPlanLabel = (plan) => {
    const durationText =
      plan.duration === 1
        ? plan.durationType.toUpperCase()
        : `${plan.duration} ${plan.durationType.toUpperCase()}${plan.duration > 1 ? 'S' : ''}`;

    return durationText;
  };

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
      enqueueSnackbar('Please select a Page Description.', {
        variant: 'error'
      });
      return;
    }
    if (data.plans.length === 0) {
      enqueueSnackbar('Please add at least one plan.', {
        variant: 'error'
      });
      return;
    }

    const requestData = {
      ...data,
      userName: selectedUserDetails?.userName,
      channelId: channel?.id, // Include channel ID if available
      channelName: channel?.title || channel?.name // Include channel name
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
    formData.append('file', anyFile);
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
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: '100%',
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              pb: 2
            }}
          >
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Create Telegram Page
              </Typography>
              
              {channel && (
                <Box sx={{ mb: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Creating page for: {channel.title || channel.name}
                  </Typography>
                  <Typography variant="body2">
                    Channel ID: {channel.id}
                  </Typography>
                </Box>
              )}

              <TextField
                label="Page Title"
                placeholder="Add Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.pageTitle}
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
                value={data.description}
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    description: event.target.value
                  }))
                }
                sx={{ mt: 0 }}
              />

              {/* Plan Management Section */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Create Subscription Plans
              </Typography>

              {/* Add New Plan */}
              <Card variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Add New Plan
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Duration"
                      value={newPlan.duration}
                      onChange={(e) => setNewPlan((prev) => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                      inputProps={{ min: 1 }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={newPlan.durationType}
                        label="Type"
                        onChange={(e) => setNewPlan((prev) => ({ ...prev, durationType: e.target.value }))}
                      >
                        <MenuItem value="day">Day</MenuItem>
                        <MenuItem value="week">Week</MenuItem>
                        <MenuItem value="month">Month</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Price (₹)"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan((prev) => ({ ...prev, price: e.target.value }))}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Discount (%)"
                      value={newPlan.discount}
                      onChange={(e) => setNewPlan((prev) => ({ ...prev, discount: e.target.value }))}
                      inputProps={{ min: 0, max: 100 }}
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Button variant="contained" onClick={handleAddPlan} startIcon={<Add />} sx={{ mt: 2 }} size="small">
                  Add Plan
                </Button>
              </Card>

              {/* Display Added Plans */}
              {data.plans.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Added Plans:
                  </Typography>
                  {data.plans.map((plan) => (
                    <Chip
                      key={plan.id}
                      label={`${formatPlanLabel(plan)} - ₹${calculateFinalPrice(plan.price, plan.discount)} ${plan.discount > 0 ? `(${plan.discount}% off)` : ''}`}
                      onDelete={() => handleRemovePlan(plan.id)}
                      deleteIcon={<Delete />}
                      sx={{ mr: 1, mb: 1 }}
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}

              <TextField
                select
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.category}
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    category: event.target.value
                  }))
                }
                sx={{ mt: 2 }}
              >
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Health">Health</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
              </TextField>

              <Typography variant="h5" sx={{ mt: 2 }}>
                Add Thumbnail for the page
              </Typography>
              <Box border={1} borderColor="grey.400" borderRadius={1} p={2} textAlign="center" mt={1} mb={2}>
                <IconButton color="primary" component="label">
                  <CloudUpload />
                  <input hidden accept=".jpg,.jpeg,.png" type="file" onChange={handleFileChange} />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  Browse files from your system
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  1280 x 720 (16:9) recommended
                </Typography>
              </Box>

              <TextField
                label="Button Text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={data.buttonText}
                inputProps={{ maxLength: 15 }}
                helperText={`${data.buttonText.length}/15`}
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    buttonText: event.target.value
                  }))
                }
              />

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
              overflow: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <Box
              sx={{
                backgroundColor: '#0F0F23',
                backgroundImage: 'linear-gradient(to bottom, #0F0F23 0%, #1A1A2E 100%)',
                color: 'white',
                minHeight: '100vh'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 3, pl: 3 }}>
                Preview
              </Typography>
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
                          label={data.category}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(255, 193, 7, 0.2)',
                            color: '#FFC107',
                            mr: 1
                          }}
                        />
                        <Chip
                          label={`${data.plans.length} Plans`}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            color: '#4CAF50'
                          }}
                        />
                      </Box>

                      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        {data?.pageTitle || 'Your Page Title'}
                      </Typography>

                      <Typography variant="body1" color="grey.300" sx={{ mb: 3 }}>
                        {data?.description || 'Your page description will appear here...'}
                      </Typography>

                      {preview && (
                        <Box sx={{ mb: 3 }}>
                          <img
                            src={preview}
                            alt="Thumbnail"
                            style={{
                              width: '100%',
                              borderRadius: 8,
                              maxHeight: 200,
                              objectFit: 'cover'
                            }}
                          />
                        </Box>
                      )}

                      <Typography variant="body2" color="grey.400" sx={{ mt: 3 }}>
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
                          {data?.pageTitle || 'VIP GROUP'} 🔥
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Select a plan and continue
                      </Typography>

                      {data.plans.length > 0 ? (
                        <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                          {data.plans.map((plan) => {
                            const finalPrice = calculateFinalPrice(plan.price, plan.discount);
                            const hasDiscount = plan.discount > 0;

                            return (
                              <Paper
                                key={plan.id}
                                sx={{
                                  p: 2,
                                  mb: 2,
                                  background:
                                    selectedPlan === plan.id.toString()
                                      ? 'linear-gradient(90deg, #4A90E2 0%, #357ABD 100%)'
                                      : 'linear-gradient(90deg, #6C7B8B 0%, #4F5F6F 100%)',
                                  color: 'white',
                                  borderRadius: 3,
                                  cursor: 'pointer',
                                  border: selectedPlan === plan.id.toString() ? '2px solid #FFD700' : 'none',
                                  transition: 'all 0.3s ease'
                                }}
                                onClick={() => setSelectedPlan(plan.id.toString())}
                              >
                                <FormControlLabel
                                  value={plan.id.toString()}
                                  control={<Radio sx={{ color: 'white' }} />}
                                  label={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <Typography variant="h6" fontWeight="bold">
                                        {formatPlanLabel(plan)}
                                      </Typography>
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
                                          ₹{finalPrice}
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
                        <Paper
                          sx={{
                            p: 3,
                            textAlign: 'center',
                            backgroundColor: '#f5f5f5',
                            borderRadius: 3
                          }}
                        >
                          <Typography color="textSecondary">No plans available. Please add some plans first.</Typography>
                        </Paper>
                      )}

                      {data.plans.length > 0 && (
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
                          {data?.buttonText || 'Join Now'}
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
        </Grid>
      </Box>
    </>
  );
}