import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Avatar,
  Fade,
  Chip,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { telegramSendOtpApi, telegramVerifyOtpApi, telegramCreateChannelApi } from '../../store/telegram/telegramApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupIcon from '@mui/icons-material/Group';
import TelegramIcon from '@mui/icons-material/Telegram';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const TelegramVerificationModal = ({ open, onClose, onVerificationComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [channels, setChannels] = useState([]);
  const [verified, setVerified] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelDescription, setNewChannelDescription] = useState('');
  const [creatingChannel, setCreatingChannel] = useState(false);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      setPhoneNumber('');
      setOtp('');
      setLoading(false);
      setError('');
      setSuccess('');
      setChannels([]);
      setVerified(false);
      setSelectedChannel('');
      setNewChannelName('');
      setNewChannelDescription('');
      setCreatingChannel(false);
    }
  }, [open]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const data = { phoneNumber, userName: selectedUserDetails?.userName };
      const response = await dispatch(telegramSendOtpApi(data));
      const result = unwrapResult(response);

      if (result.success) {
        if (result.verified && result.hasSession) {
          setVerified(true);
          setChannels(result.channels || []);
          setActiveStep(2);
          setSuccess('Welcome back! You are already logged in.');
        } else {
          setActiveStep(1);
          setSuccess('OTP sent! Check your Telegram app for the verification code.');
        }
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError(error || error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const data = { phoneNumber, otp, userName: selectedUserDetails?.userName };
      const response = await dispatch(telegramVerifyOtpApi(data));
      const result = unwrapResult(response);

      if (result.success) {
        setVerified(true);
        setChannels(result.channels || []);
        setActiveStep(2);
        setSuccess('Login successful!');
      } else {
        setError(result.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChannel = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const data = {
        phoneNumber,
        channelName: newChannelName,
        channelDescription: newChannelDescription,
        isPublic: false
      };

      const response = await dispatch(telegramCreateChannelApi(data));
      const result = unwrapResult(response);

      if (result.success) {
        setSuccess('Channel created successfully!');
        const updatedChannels = [...channels, result.channel];
        setChannels(updatedChannels);
        setSelectedChannel(result.channel.id);
        const channelWithPhone = {
          ...result.channel,
          phoneNumber: phoneNumber
        };
        navigateToTelegramPage(channelWithPhone);
      } else {
        setError(result.message || 'Failed to create channel');
      }
    } catch (error) {
      setError(error.message || 'Failed to create channel');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChannel = () => {
    if (!selectedChannel) {
      setError('Please select a channel');
      return;
    }
    let channel = channels.find((c) => c.id === selectedChannel);
    const channelWithPhone = {
      ...channel,
      phoneNumber: phoneNumber
    };
    if (channel) {
      navigateToTelegramPage(channelWithPhone);
    }
  };

  const navigateToTelegramPage = (channel) => {
    onClose();
    onVerificationComplete(channel);
  };

  const steps = [
    { label: 'Phone Number', icon: <PhoneIcon /> },
    { label: 'Verify OTP', icon: <VerifiedUserIcon /> },
    { label: 'Select Channel', icon: <GroupIcon /> }
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Fade in timeout={500}>
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 24px',
                  bgcolor: '#0088cc',
                  boxShadow: '0 4px 20px rgba(0,136,204,0.3)'
                }}
              >
                <TelegramIcon sx={{ fontSize: 48 }} />
              </Avatar>

              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                Connect Your Telegram
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                Enter your Telegram phone number to get started. We'll send you a verification code.
              </Typography>

              <TextField
                fullWidth
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  let value = e.target.value;

                  // Remove all non-numeric characters except plus sign
                  value = value.replace(/[^\d+]/g, '');

                  // If there's a plus sign, keep it at the beginning
                  if (value.includes('+')) {
                    const parts = value.split('+');
                    value = '+' + parts.slice(1).join('').replace(/[^\d]/g, '');
                  }

                  // Get digits only (without plus sign) for length checking
                  const digitsOnly = value.replace('+', '');

                  // Allow maximum 10 digits after optional country code
                  if (value.startsWith('+')) {
                    // If starts with +, allow + followed by max 15 digits (for international numbers)
                    // But you can adjust this based on your needs
                    if (digitsOnly.length <= 15) {
                      // Adjust max length as needed
                      setPhoneNumber(value);
                    }
                  } else {
                    // If no +, allow max 10 digits for local numbers
                    if (digitsOnly.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }
                }}
                placeholder="+911234567890"
                disabled={loading}
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#0088cc'
                    }
                  }
                }}
              />
            </Box>
          </Fade>
        );

      case 1:
        return (
          <Fade in timeout={500}>
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 24px',
                  bgcolor: '#34c759',
                  boxShadow: '0 4px 20px rgba(52,199,89,0.3)'
                }}
              >
                <VerifiedUserIcon sx={{ fontSize: 48 }} />
              </Avatar>

              <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                Verify Your Account
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                Enter the verification code sent to your Telegram app
              </Typography>

              <TextField
                fullWidth
                label="Verification Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                placeholder="Enter 5-digit code"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '1.5rem',
                    letterSpacing: '0.5rem',
                    textAlign: 'center',
                    '&:hover fieldset': {
                      borderColor: '#34c759'
                    }
                  }
                }}
              />
            </Box>
          </Fade>
        );

      case 2:
        return (
          <Fade in timeout={500}>
            <Box sx={{ py: 2 }}>
              {!creatingChannel ? (
                <>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        margin: '0 auto 16px',
                        bgcolor: '#ff9500',
                        boxShadow: '0 4px 20px rgba(255,149,0,0.3)'
                      }}
                    >
                      <GroupIcon sx={{ fontSize: 48 }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                      Choose Your Channel
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Select an existing channel or create a new one
                    </Typography>
                  </Box>

                  {channels.length > 0 ? (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Select Channel</InputLabel>
                      <Select
                        value={selectedChannel}
                        onChange={(e) => setSelectedChannel(e.target.value)}
                        label="Select Channel"
                        sx={{
                          borderRadius: 2,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ff9500'
                          }
                        }}
                      >
                        {channels.map((channel) => (
                          <MenuItem key={channel.id} value={channel.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                              <GroupIcon sx={{ color: 'text.secondary' }} />
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body1">{channel.title}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {channel.memberCount} members
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                      No channels found. Create your first channel to get started!
                    </Alert>
                  )}

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => setCreatingChannel(true)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      borderColor: '#0088cc',
                      color: '#0088cc',
                      '&:hover': {
                        borderColor: '#0088cc',
                        bgcolor: 'rgba(0,136,204,0.04)'
                      }
                    }}
                  >
                    Create New Channel
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <IconButton onClick={() => setCreatingChannel(false)} sx={{ mb: 2 }}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      Create New Channel
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Set up your new Telegram channel
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Channel Name"
                    value={newChannelName}
                    onChange={(e) => setNewChannelName(e.target.value)}
                    disabled={loading}
                    placeholder="e.g., My Awesome Channel"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Channel Description"
                    value={newChannelDescription}
                    onChange={(e) => setNewChannelDescription(e.target.value)}
                    disabled={loading}
                    multiline
                    rows={4}
                    placeholder="Describe what your channel is about..."
                    sx={{
                      '& .MuiOutlinedInput-root': { borderRadius: 2 }
                    }}
                  />
                </>
              )}
            </Box>
          </Fade>
        );

      default:
        return null;
    }
  };

  const getActionButton = () => {
    switch (activeStep) {
      case 0:
        return (
          <Button
            onClick={handleSendOtp}
            variant="contained"
            disabled={!phoneNumber || loading || phoneNumber?.length < 10}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.5,
              bgcolor: '#0088cc',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { bgcolor: '#006ba3' }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Verification Code'}
          </Button>
        );

      case 1:
        return (
          <Button
            onClick={handleVerifyOtp}
            variant="contained"
            disabled={!otp || loading}
            fullWidth
            sx={{
              borderRadius: 2,
              py: 1.5,
              bgcolor: '#34c759',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': { bgcolor: '#2da74a' }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify & Continue'}
          </Button>
        );

      case 2:
        return (
          <>
            {creatingChannel ? (
              <Button
                onClick={handleCreateChannel}
                variant="contained"
                disabled={!newChannelName || loading}
                fullWidth
                startIcon={loading ? null : <CheckCircleIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: '#ff9500',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#e08600' }
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Create Channel'}
              </Button>
            ) : (
              <Button
                onClick={handleSelectChannel}
                variant="contained"
                disabled={!selectedChannel || loading}
                fullWidth
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: '#ff9500',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#e08600' }
                }}
              >
                Continue with Selected Channel
              </Button>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TelegramIcon sx={{ fontSize: 32, color: '#0088cc' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Telegram Integration
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" disabled={loading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 4,
            mt: 2,
            '& .MuiStepIcon-root.Mui-active': {
              color: '#0088cc'
            },
            '& .MuiStepIcon-root.Mui-completed': {
              color: '#34c759'
            }
          }}
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} icon={<CheckCircleIcon />} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {renderStepContent()}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Box sx={{ width: '100%' }}>{getActionButton()}</Box>
      </DialogActions>
    </Dialog>
  );
};

export default TelegramVerificationModal;
