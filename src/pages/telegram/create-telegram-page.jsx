/* eslint-disable react-hooks/exhaustive-deps */
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
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
  Divider,
  Alert,
  Stack,
  CardContent,
  Container,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  CloudUpload,
  Add,
  Delete,
  InfoOutlined,
  CheckCircle,
  LocalOffer,
  CalendarToday,
  Security,
  ArrowBack,
  Title,
  Description,
  Category,
  Person,
  Telegram,
  Shield,
  TrendingUp,
  Edit
} from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router';

// project imports
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  createTelegramPageApi,
  uploadTelegramThumbnailApi,
  getTelegramPageDetailsByIdApi,
  updateTelegramApi
} from '../../store/telegram/telegramApi';

export default function CreateTelegramPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, 'Dwdnw');
  // const {id } = params;
  console.log(location.state, 'Dweklnfkedw');

  const channel = location.state?.channel;
  const id = location.state?.id;

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [step, setStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState('');

  const [data, setData] = useState({
    channelName: '',
    channelLink: '',
    userName: selectedUserDetails?.userName || '',
    title: '',
    description: '',
    buttonText: 'Join Now',
    category: 'Finance',
    imageUrl: '',
    plans: [],
    phoneNumber: channel?.phoneNumber || ''
  });

  const [newPlan, setNewPlan] = useState({
    price: '',
    discount: '',
    totalNumber: '',
    value: 'Month'
  });

  // Check if we're in edit mode and load data
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchTelegramPageDetails();
    }
  }, [id]);

  // Fetch existing Telegram page details for edit mode
  const fetchTelegramPageDetails = async () => {
    setLoading(true);
    try {
      const response = await dispatch(getTelegramPageDetailsByIdApi({ telegramId: id }));
      const result = unwrapResult(response);

      if (result) {
        const pageData = result;

        // Update state with existing data
        setData({
          channelName: pageData.channelName || '',
          channelLink: pageData.channelLink || '',
          userName: pageData.userName || selectedUserDetails?.userName || '',
          title: pageData.title || '',
          description: pageData.description || '',
          buttonText: pageData.buttonText || 'Join Now',
          category: pageData.category || 'Finance',
          imageUrl: pageData.imageUrl || '',
          plans: pageData.plans || [],
          phoneNumber: pageData.phoneNumber || ''
        });

        // Set existing image URL for preview
        if (pageData.imageUrl) {
          setExistingImageUrl(pageData.imageUrl);
          setPreview(pageData.imageUrl);
        }
      }
    } catch (error) {
      enqueueSnackbar(`Failed to load page details: ${error}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = () => {
    if (!newPlan.price) {
      enqueueSnackbar('Please enter a price for the plan', { variant: 'error' });
      return;
    }

    if (parseFloat(newPlan.discount) > parseFloat(newPlan.price)) {
      enqueueSnackbar('Discount cannot exceed price', { variant: 'error' });
      return;
    }

    if (!newPlan.totalNumber) {
      enqueueSnackbar('Please enter the total number for the plan', { variant: 'error' });
      return;
    }

    const plan = {
      price: parseFloat(newPlan.price),
      discount: parseFloat(newPlan.discount) || 0,
      totalNumber: parseInt(newPlan.totalNumber),
      value: newPlan.value
    };

    setData((prevData) => ({
      ...prevData,
      plans: [...prevData.plans, plan]
    }));

    setNewPlan({
      price: '',
      discount: '',
      totalNumber: '',
      value: 'Month'
    });

    enqueueSnackbar('Plan added successfully', { variant: 'success' });
  };

  const handleRemovePlan = (index) => {
    setData((prevData) => ({
      ...prevData,
      plans: prevData.plans.filter((_, i) => i !== index)
    }));
    enqueueSnackbar('Plan removed', { variant: 'info' });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      { field: data.channelName, message: 'Please enter a channel name' },
      { field: data.title, message: 'Please enter a title' },
      { field: data.description, message: 'Please enter a description' },
      { field: isEditMode ? true : file, message: 'Please select a thumbnail file' },
      { field: data.plans.length > 0, message: 'Please add at least one plan' }
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        enqueueSnackbar(message, { variant: 'error' });
        return;
      }
    }

    try {
      const requestData = {
        ...data,
        channelLink: channel?.inviteLink || data.channelLink,
        userName: selectedUserDetails?.userName,
        channelId: channel?.id
      };

      let response;

      if (isEditMode) {
        // Update existing page
        requestData.id = id;
        response = await dispatch(updateTelegramApi(requestData));
        response = unwrapResult(response);

        // Upload new image if changed
        if (file) {
          await handleUpload(id);
        }

        enqueueSnackbar('🎉 Telegram page updated successfully!', { variant: 'success' });
      } else {
        // Create new page
        response = await dispatch(createTelegramPageApi(requestData));
        response = unwrapResult(response);
        const telegramId = response?.result?._id;

        // Upload image for new page
        if (file) {
          await handleUpload(telegramId);
        }

        enqueueSnackbar('🎉 Telegram page created successfully!', { variant: 'success' });
      }

      // Navigate back or to listing page
      navigate('/telegram-page');
    } catch (error) {
      console.log(error, 'error');
      enqueueSnackbar(`Failed to ${isEditMode ? 'update' : 'create'} Telegram page: ${error}`, { variant: 'error' });
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      enqueueSnackbar('Please select an image file', { variant: 'error' });
      return;
    }

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);

    // Clear existing image URL when new file is selected
    setExistingImageUrl('');
  };

  const handleUpload = async (telegramId) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('telegramId', telegramId);
    formData.append('image', file);

    setUploading(true);

    try {
      await dispatch(uploadTelegramThumbnailApi(formData));
    } catch (error) {
      enqueueSnackbar(`Failed to upload the file: ${error.message}`, { variant: 'error' });
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleClearImage = () => {
    setFile(null);
    setPreview(null);
    setExistingImageUrl('');
    setData((prev) => ({ ...prev, imageUrl: '' }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <CircularProgress size={60} sx={{ color: 'white' }} />
      </Box>
    );
  }

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
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header with Progress */}
          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
              color: 'white'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => navigate(-1)}
                  sx={{
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  Back
                </Button>
                <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                  {isEditMode ? '✏️ Edit Telegram Page' : '✨ Create Premium Telegram Page'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {isEditMode
                    ? 'Update your Telegram channel subscription page'
                    : 'Design your exclusive Telegram channel subscription page'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {channel && (
                  <Chip
                    icon={<Telegram />}
                    label={`${channel.title}`}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                )}
                {isEditMode && (
                  <Chip
                    icon={<Edit />}
                    label="Edit Mode"
                    color="warning"
                    sx={{
                      fontWeight: 600
                    }}
                  />
                )}
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={
                (data.plans.length > 0 ? 20 : 0) +
                (file || existingImageUrl ? 20 : 0) +
                (data.title ? 20 : 0) +
                (data.description ? 20 : 0) +
                (data.channelName ? 20 : 0)
              }
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
            {/* Form Section - Now Scrollable */}
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
                  {/* Step 1: Basic Info */}
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
                          sx={{
                            bgcolor: '#4f46e5',
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="#4f46e5">
                            Channel Information
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Basic details about your channel
                          </Typography>
                        </Box>
                      </Box>

                      <Stack spacing={2.5}>
                        <TextField
                          label="Channel Name"
                          placeholder="Enter your channel name"
                          variant="outlined"
                          fullWidth
                          disabled={isEditMode}
                          value={data.channelName}
                          onChange={(e) => setData((prevData) => ({ ...prevData, channelName: e.target.value }))}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Telegram color="primary" />
                              </InputAdornment>
                            )
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

                        <TextField
                          label="Page Title"
                          placeholder="Create a compelling title"
                          variant="outlined"
                          fullWidth
                          value={data.title}
                          onChange={(e) => setData((prevData) => ({ ...prevData, title: e.target.value }))}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Title color="primary" />
                              </InputAdornment>
                            )
                          }}
                          helperText="Make it catchy and descriptive"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />

                        <TextField
                          label="Description"
                          placeholder="Describe what subscribers will get..."
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={3}
                          value={data.description}
                          onChange={(e) => setData((prevData) => ({ ...prevData, description: e.target.value }))}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Description color="primary" />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />

                        <TextField
                          label="Button Text"
                          placeholder="Join Now"
                          variant="outlined"
                          fullWidth
                          value={data.buttonText}
                          onChange={(e) => setData((prevData) => ({ ...prevData, buttonText: e.target.value }))}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />

                        <TextField
                          select
                          label="Category"
                          variant="outlined"
                          fullWidth
                          value={data.category}
                          onChange={(e) => setData((prevData) => ({ ...prevData, category: e.target.value }))}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Category color="primary" />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        >
                          <MenuItem value="Finance">💰 Finance & Investment</MenuItem>
                          <MenuItem value="Health">🏥 Health & Wellness</MenuItem>
                          <MenuItem value="Education">🎓 Education & Learning</MenuItem>
                          <MenuItem value="Technology">💻 Technology & Coding</MenuItem>
                          <MenuItem value="Entertainment">🎬 Entertainment</MenuItem>
                          <MenuItem value="Business">💼 Business & Startup</MenuItem>
                        </TextField>
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Step 2: Plans */}
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
                          sx={{
                            bgcolor: '#10b981',
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <LocalOffer />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="#10b981">
                            Subscription Plans
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Set up your pricing and duration
                          </Typography>
                        </Box>
                      </Box>

                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2.5,
                          mb: 3,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, color: '#475569' }}>
                          Add New Plan
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Price (₹)"
                              value={newPlan.price}
                              onChange={(e) => setNewPlan((prev) => ({ ...prev, price: e.target.value }))}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Discount (₹)"
                              value={newPlan.discount}
                              onChange={(e) => {
                                const discountValue = e.target.value;
                                if (parseFloat(discountValue) > parseFloat(newPlan.price)) {
                                  enqueueSnackbar('Discount cannot exceed price', { variant: 'error' });
                                  return;
                                }
                                setNewPlan((prev) => ({ ...prev, discount: discountValue }));
                              }}
                              InputProps={{
                                startAdornment: <InputAdornment position="start">-₹</InputAdornment>
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              type="number"
                              label="Duration"
                              value={newPlan.totalNumber}
                              onChange={(e) => setNewPlan((prev) => ({ ...prev, totalNumber: e.target.value }))}
                              helperText="Number of time units"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              select
                              fullWidth
                              label="Time Unit"
                              value={newPlan.value}
                              onChange={(e) => setNewPlan((prev) => ({ ...prev, value: e.target.value }))}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 2
                                }
                              }}
                            >
                              <MenuItem value="Day">Days</MenuItem>
                              <MenuItem value="Week">Weeks</MenuItem>
                              <MenuItem value="Month">Months</MenuItem>
                              <MenuItem value="Year">Years</MenuItem>
                              <MenuItem value="Lifetime">Lifetime</MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>

                        <Button
                          variant="contained"
                          onClick={handleAddPlan}
                          startIcon={<Add />}
                          fullWidth
                          disabled={!newPlan.price || !newPlan.totalNumber}
                          sx={{
                            mt: 2,
                            py: 1.2,
                            borderRadius: 2,
                            background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)'
                            }
                          }}
                        >
                          Add Plan
                        </Button>
                      </Paper>

                      {data.plans.length > 0 ? (
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2, color: '#475569' }}>
                            Current Plans ({data.plans.length})
                          </Typography>
                          <Stack spacing={1.5}>
                            {data.plans.map((plan, index) => (
                              <Paper
                                key={index}
                                sx={{
                                  p: 2,
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  background: index % 2 === 0 ? '#f8fafc' : 'white',
                                  borderRadius: 2,
                                  border: '1px solid #e2e8f0',
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                    borderColor: '#4f46e5',
                                    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.1)'
                                  }
                                }}
                              >
                                <Box>
                                  <Typography variant="body1" fontWeight="medium">
                                    {plan.totalNumber} {plan.value}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Original: ₹{plan.price} • Discount: ₹{plan.discount}
                                  </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right' }}>
                                  <Typography variant="h6" fontWeight="bold" color="#10b981">
                                    ₹{plan.price - plan.discount}
                                  </Typography>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemovePlan(index)}
                                    sx={{
                                      color: '#ef4444',
                                      '&:hover': { backgroundColor: '#fee2e2' }
                                    }}
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Paper>
                            ))}
                          </Stack>
                        </Box>
                      ) : (
                        <Alert
                          severity="info"
                          icon={<InfoOutlined />}
                          sx={{
                            borderRadius: 2,
                            backgroundColor: '#f0f9ff',
                            color: '#0369a1',
                            border: '1px solid #bae6fd'
                          }}
                        >
                          Add at least one subscription plan for your channel
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* Step 3: Thumbnail */}
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
                          sx={{
                            bgcolor: '#f59e0b',
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <CloudUpload />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="#f59e0b">
                            Thumbnail Image
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {isEditMode ? 'Update your cover image' : 'Upload a cover image for your page'}
                          </Typography>
                        </Box>
                      </Box>

                      {existingImageUrl && !file && (
                        <Box sx={{ mb: 2, position: 'relative' }}>
                          <img
                            src={existingImageUrl}
                            alt="Current thumbnail"
                            style={{
                              width: '100%',
                              maxHeight: '200px',
                              objectFit: 'cover',
                              borderRadius: '8px'
                            }}
                          />
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleClearImage}
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              minWidth: 'auto',
                              padding: '4px 8px'
                            }}
                          >
                            <Delete fontSize="small" />
                          </Button>
                        </Box>
                      )}

                      <Box
                        sx={{
                          border: '2px dashed',
                          borderColor: file || existingImageUrl ? '#10b981' : '#cbd5e1',
                          borderRadius: 3,
                          p: 4,
                          textAlign: 'center',
                          backgroundColor: file || existingImageUrl ? '#f0fdf4' : '#f8fafc',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          '&:hover': {
                            borderColor: '#4f46e5',
                            backgroundColor: '#f1f5f9'
                          }
                        }}
                        onClick={() => document.getElementById('file-input').click()}
                      >
                        <input id="file-input" hidden accept=".jpg,.jpeg,.png,.webp" type="file" onChange={handleFileChange} />
                        {file || existingImageUrl ? (
                          <>
                            <CheckCircle sx={{ fontSize: 48, color: '#10b981', mb: 2 }} />
                            <Typography variant="body1" fontWeight="medium" color="#10b981">
                              {file ? `✓ ${file.name}` : '✓ Image loaded'}
                            </Typography>
                            <Typography variant="caption" color="#64748b" sx={{ mt: 1, display: 'block' }}>
                              {isEditMode ? 'Click to change image' : 'Image selected'}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CloudUpload sx={{ fontSize: 48, color: '#64748b', mb: 2 }} />
                            <Typography variant="body1" fontWeight="medium" color="#475569">
                              Click to upload thumbnail
                            </Typography>
                          </>
                        )}
                        <Typography variant="caption" color="#64748b" sx={{ mt: 1, display: 'block' }}>
                          1280 × 720px recommended • JPG, PNG, WebP
                        </Typography>
                      </Box>

                      {isEditMode && existingImageUrl && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                          Current image will be kept if no new file is selected
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSubmit}
                    disabled={uploading || data.plans.length === 0 || (!file && !existingImageUrl && !isEditMode)}
                    sx={{
                      py: 1.8,
                      borderRadius: 3,
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                      boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #4338ca 0%, #6d28d9 100%)',
                        boxShadow: '0 6px 25px rgba(79, 70, 229, 0.5)'
                      },
                      '&:disabled': {
                        background: '#cbd5e1',
                        color: '#64748b'
                      }
                    }}
                  >
                    {uploading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <CheckCircle sx={{ mr: 1.5, fontSize: 24 }} />
                        {isEditMode ? 'Update Premium Page' : '🚀 Create Premium Page'}
                      </>
                    )}
                  </Button>

                  <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mt: 2, display: 'block' }}>
                    {isEditMode ? 'Page will be updated immediately' : 'Page will be live immediately after creation'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Preview Section - Also Scrollable */}
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
                    📱 Live Preview
                  </Typography>

                  <Grid container spacing={3}>
                    {/* Left Preview Card */}
                    <Grid item xs={12} lg={6}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.97)',
                          backdropFilter: 'blur(10px)',
                          height: '100%',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar
                            src={preview || existingImageUrl}
                            sx={{
                              width: 64,
                              height: 64,
                              mr: 2,
                              border: '3px solid',
                              borderColor: '#4f46e5',
                              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                            }}
                          >
                            {data.channelName?.[0] || 'T'}
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
                              {data.channelName || 'Your Channel Name'}
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
                            {data.title || 'Premium Channel Access'}
                          </Typography>
                          <Typography variant="body2" color="#475569" paragraph sx={{ lineHeight: 1.7 }}>
                            {data.description || 'Join our exclusive community for premium content and insights...'}
                          </Typography>

                          {data.category && (
                            <Chip
                              label={data.category}
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
                            {[
                              'Exclusive content access',
                              'Premium community access',
                              'Priority support',
                              'Early access to new features'
                            ].map((item, index) => (
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
                            ))}
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Right Pricing Card */}
                    <Grid item xs={12} lg={6}>
                      <Paper
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                          color: 'white',
                          height: '100%',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
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
                            {data.title || 'Premium Membership'} 🔥
                          </Typography>
                          <Typography variant="body2" color="#cbd5e1">
                            Choose your perfect subscription plan
                          </Typography>
                        </Box>

                        {data.plans.length > 0 ? (
                          <>
                            <RadioGroup value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                              <Stack spacing={2}>
                                {data.plans.map((plan, index) => {
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
                                        border:
                                          selectedPlan === index.toString() ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.15)',
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
                                            top: -2,
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
                              {data.buttonText || 'Join Now'} →
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
                              Add subscription plans to see pricing preview
                            </Typography>
                            <Typography variant="caption" color="rgba(255,255,255,0.5)">
                              Plans will appear here once added
                            </Typography>
                          </Paper>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.6)">
                      Preview updates in real-time as you make changes
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
