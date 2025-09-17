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
  Avatar,
  FormControl,
  Select,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material';
import { CloudUpload, Add, Delete } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { createTelegramPageApi, uploadTelegramThumbnailApi } from '../../store/telegram/telegramApi';

export default function CreateTelegramPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get channel data from navigation state
  const channel = location.state?.channel;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const [data, setData] = useState({
    channelName: '',
    channelLink: '', // This will be populated with channel.invitelink on submit
    userName: selectedUserDetails?.userName || '',
    title: '',
    description: '',
    buttonText: 'Join Now',
    category: 'Finance',
    imageUrl: '',
    plans: []
  });

  // Plan management state
  const [newPlan, setNewPlan] = useState({
    price: '',
    discount: '',
    totalNumber: '',
    value: ''
  });

  // Pre-fill form with channel data if available
  useEffect(() => {
    if (channel) {
      console.log(channel,"dlwkme")
      setData(prevData => ({
        ...prevData,
        channelName: channel.title || channel.name || '',
        channelLink: channel.inviteLink
        // title: channel.title || channel.name || '',
        // Don't set channelLink here, it will be set on submit
        // description: channel.description || `Join ${channel.title || channel.name} for exclusive content`
      }));
    }
  }, [channel]);

  console.log(data,"dl;ew;")

  const handleAddPlan = () => {
    // Validate required plan fields
    if (!newPlan.price) {
      enqueueSnackbar('Please enter a price for the plan', { variant: 'error' });
      return;
    }
    
    // Validate discount doesn't exceed price
    if (parseFloat(newPlan.discount) > parseFloat(newPlan.price)) {
      enqueueSnackbar('Discount cannot exceed price', { variant: 'error' });
      return;
    }
    
    if (!newPlan.totalNumber) {
      enqueueSnackbar('Please enter the total number for the plan', { variant: 'error' });
      return;
    }
    if (!newPlan.value) {
      enqueueSnackbar('Please select a time period for the plan', { variant: 'error' });
      return;
    }

    const plan = {
      price: parseFloat(newPlan.price),
      discount: parseFloat(newPlan.discount) || 0,
      totalNumber: parseInt(newPlan.totalNumber),
      value: newPlan.value
    };

    setData(prevData => ({
      ...prevData,
      plans: [...prevData.plans, plan]
    }));

    // Reset new plan form
    setNewPlan({
      price: '',
      discount: '',
      totalNumber: '',
      value: ''
    });

    enqueueSnackbar('Plan added successfully', { variant: 'success' });
  };

  const handleRemovePlan = (index) => {
    setData(prevData => ({
      ...prevData,
      plans: prevData.plans.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    // Validate all required fields
    const requiredFields = [
      { field: data.channelName, message: 'Please enter a channel name' },
      { field: data.title, message: 'Please enter a title' },
      { field: data.description, message: 'Please enter a description' },
      { field: data.buttonText, message: 'Please enter button text' },
      { field: data.category, message: 'Please select a category' },
      { field: file, message: 'Please select a thumbnail file' },
      { field: data.plans.length > 0, message: 'Please add at least one plan' }
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        enqueueSnackbar(message, { variant: 'error' });
        return;
      }
    }

    // Validate each plan has required fields
    for (const plan of data.plans) {
      if (!plan.price || !plan.totalNumber || !plan.value) {
        enqueueSnackbar('All plans must have price, total number, and value', { variant: 'error' });
        return;
      }
      
      // Validate discount doesn't exceed price
      if (plan.discount > plan.price) {
        enqueueSnackbar(`Discount cannot exceed price in plan: ${plan.value}`, { variant: 'error' });
        return;
      }
    }

    try {
      // Set the channelLink to the invite link from the channel object
      const requestData = {
        ...data,
        channelLink: channel?.inviteLink || '', // Use the invite link from the channel
        userName: selectedUserDetails?.userName,
        channelId: channel?.id
      };
      
      let response = await dispatch(createTelegramPageApi(requestData));
      response = unwrapResult(response);
      console.log(response,"Dkwejnk")
      const telegramId = response?.result?._id;
      
      await handleUpload(telegramId);
      enqueueSnackbar('Telegram page created successfully!', { variant: 'success' });
      navigate('/telegram-page');
    } catch (error) {
      enqueueSnackbar(`Failed to create Telegram page: ${error.message}`, { variant: 'error' });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    
    // Check file type
    if (!selectedFile.type.startsWith('image/')) {
      enqueueSnackbar('Please select an image file', { variant: 'error' });
      return;
    }
    
    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleUpload = async (telegramId) => {
    const formData = new FormData();
    formData.append('telegramId', telegramId);
    formData.append('image', file);

    setUploading(true);

    try {
      await dispatch(uploadTelegramThumbnailApi(formData));
      enqueueSnackbar('Thumbnail uploaded successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(`Failed to upload the file: ${error.message}`, { variant: 'error' });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Form Section */}
        <Grid item xs={12} md={4} sx={{ height: '100%', overflow: 'auto', pb: 2 }}>
          <Box sx={{ backgroundColor: 'white', p: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
              Create Telegram Page
            </Typography>

            {channel && (
              <Box sx={{ mb: 2, p: 1, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Creating page for: {channel.title || channel.name}
                </Typography>
                <Typography variant="body2">Channel ID: {channel.id}</Typography>
                {/* Removed the invite link display from the UI */}
              </Box>
            )}

            <TextField
              label="Channel Name *"
              placeholder="Add Channel Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={data.channelName}
              onChange={(e) => setData(prevData => ({ ...prevData, channelName: e.target.value }))}
            />

            {/* Removed the Channel Link input field */}

            <TextField
              label="Title *"
              placeholder="Add Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={data.title}
              onChange={(e) => setData(prevData => ({ ...prevData, title: e.target.value }))}
            />

            <TextField
              label="Description *"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={data.description}
              onChange={(e) => setData(prevData => ({ ...prevData, description: e.target.value }))}
              helperText="Describe what users will get from this channel"
            />

            {/* Plan Management Section */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, mt: 2 }}>
              Create Subscription Plans *
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
                    label="Price *"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: e.target.value }))}
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discount (₹)"
                    value={newPlan.discount}
                    onChange={(e) => {
                      const discountValue = e.target.value;
                      // Validate discount doesn't exceed price
                      if (parseFloat(discountValue) > parseFloat(newPlan.price)) {
                        enqueueSnackbar('Discount cannot exceed price', { variant: 'error' });
                        return;
                      }
                      setNewPlan(prev => ({ ...prev, discount: discountValue }));
                    }}
                    inputProps={{ min: 0 }}
                    size="small"
                    helperText="Fixed amount discount"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Total Number *"
                    value={newPlan.totalNumber}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, totalNumber: e.target.value }))}
                    size="small"
                    helperText="Add number"
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    label="Time Period *"
                    value={newPlan.value}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, value: e.target.value }))}
                    size="small"
                    helperText="Select subscription duration"
                  >
                    <MenuItem value="Day">Day</MenuItem>
                    <MenuItem value="Week">Week</MenuItem>
                    <MenuItem value="Month">Month</MenuItem>
                    <MenuItem value="Year">Year</MenuItem>
                    <MenuItem value="Lifetime">Lifetime</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Button 
                variant="contained" 
                onClick={handleAddPlan} 
                startIcon={<Add />} 
                sx={{ mt: 2 }} 
                size="small"
                disabled={!newPlan.price || !newPlan.totalNumber || !newPlan.value}
              >
                Add Plan
              </Button>
            </Card>

            {/* Display Added Plans */}
            {data.plans.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Added Plans:
                </Typography>
                {data.plans.map((plan, index) => (
                  <Chip
                    key={index}
                    label={`₹${plan.price} - Discount: ₹${plan.discount} - ${plan.totalNumber} - ${plan.value}`}
                    onDelete={() => handleRemovePlan(index)}
                    deleteIcon={<Delete />}
                    sx={{ mr: 1, mb: 1 }}
                    variant="outlined"
                  />
                ))}
              </Box>
            )}

            <TextField
              select
              label="Category *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={data.category}
              onChange={(e) => setData(prevData => ({ ...prevData, category: e.target.value }))}
            >
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </TextField>

            <Typography variant="h5" sx={{ mt: 2 }}>
              Add Thumbnail for the page *
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
              {file && (
                <Typography variant="caption" color="primary" display="block" sx={{ mt: 1 }}>
                  Selected: {file.name}
                </Typography>
              )}
            </Box>

            <TextField
              label="Button Text *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={data.buttonText}
              onChange={(e) => setData(prevData => ({ ...prevData, buttonText: e.target.value }))}
              helperText="Text for the call-to-action button"
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                '&:hover': { backgroundColor: '#333333' },
                height: 48,
                borderRadius: 2,
                mt: 2
              }}
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Save and Continue'}
            </Button>
          </Box>
        </Grid>

        {/* Preview Section */}
        <Grid item xs={12} md={8} sx={{ height: '100%', overflow: 'auto' }}>
          <Box sx={{ backgroundColor: '#0F0F23', color: 'white', minHeight: '100vh' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 3, pl: 3 }}>
              Preview
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', px: 2 }}>
              <Grid container spacing={4} maxWidth="lg">
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 4, borderRadius: 3, backgroundColor: '#2A2A2A', color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'orange', mr: 2 }}>
                        {selectedUserDetails?.name?.slice(0, 1) || 'U'}
                      </Avatar>
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
                      {data.title || 'Your Page Title'}
                    </Typography>

                    <Typography variant="body1" color="grey.300" sx={{ mb: 3 }}>
                      {data.description || 'Your page description will appear here...'}
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
                        {data.title || 'VIP GROUP'} 🔥
                      </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Select a plan and continue
                    </Typography>

                    {data.plans.length > 0 ? (
                      <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                        {data.plans.map((plan, index) => {
                          const finalPrice = plan.price - plan.discount;
                          const hasDiscount = plan.discount > 0;

                          return (
                            <Paper
                              key={index}
                              sx={{
                                p: 2,
                                mb: 2,
                                background: selectedPlan === index.toString()
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
                        {data.buttonText}
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
  );
}