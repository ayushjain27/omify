// components/TelegramVerificationModal.js
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
  Grid,
  Card,
  CardContent,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { telegramSendOtpApi, telegramVerifyOtpApi, telegramCreateChannelApi } from '../../store/telegram/telegramApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

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
      // Reset state when modal closes
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
          // User already has an active session
          setVerified(true);
          setChannels(result.channels || []);
          setActiveStep(2); // Skip to channel selection step
          setSuccess('Welcome back! You are already logged in.');
        } else {
          // New OTP sent
          setActiveStep(1);
          setSuccess('OTP sent! Check your Telegram app for the verification code.');
        }
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (error) {
      setError(error.message || 'Failed to send OTP');
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
        // Successful verification
        setVerified(true);
        setChannels(result.channels || []);
        setActiveStep(2); // Move to channel selection step
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

      console.log(data, 'd;lwekm');

      const response = await dispatch(telegramCreateChannelApi(data));
      const result = unwrapResult(response);

      if (result.success) {
        setSuccess('Channel created successfully!');

        // Add the new channel to the channels list
        const updatedChannels = [...channels, result.channel];
        setChannels(updatedChannels);

        // Select the newly created channel
        setSelectedChannel(result.channel.id);

        // Navigate to telegram page with the new channel
        navigateToTelegramPage(result.channel);
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
    console.log(channels, 'Dewkfnj');
    const channel = channels.find((c) => c.id === selectedChannel);
    console.log(channel, 'Dwel;k');
    if (channel) {
      navigateToTelegramPage(channel);
    }
  };

  const navigateToTelegramPage = (channel) => {
    // Close the modal
    onClose();
    console.log('Navigating with channel:', channel); // Debug log

    // Navigate to telegram page with channel data - make sure this is correct
    // navigate('/create-telegram-page', { state: { channel } }); // Note: channel is inside an object

    // Call the completion callback if provided
    // if (onVerificationComplete) {
    onVerificationComplete(channel);
    // }
  };

  const steps = ['Enter Phone Number', 'Verify Authentication', 'Select Channel'];

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your Telegram phone number to verify your account
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+911234567890"
              disabled={loading}
              sx={{ mb: 2 }}
            />
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter the OTP sent to your Telegram account
            </Typography>
            <TextField fullWidth label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} sx={{ mb: 2 }} />
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {creatingChannel ? 'Create New Channel' : 'Select a Channel'}
            </Typography>

            {!creatingChannel ? (
              <>
                {channels.length > 0 ? (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select Channel</InputLabel>
                    <Select value={selectedChannel} onChange={(e) => setSelectedChannel(e.target.value)} label="Select Channel">
                      {channels.map((channel) => (
                        <MenuItem key={channel.id} value={channel.id}>
                          {channel.title} ({channel.memberCount} members)
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    No channels found. Please create a new channel.
                  </Typography>
                )}

                <Button variant="outlined" onClick={() => setCreatingChannel(true)} sx={{ mb: 2 }}>
                  Create New Channel
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Channel Name"
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  disabled={loading}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Channel Description"
                  value={newChannelDescription}
                  onChange={(e) => setNewChannelDescription(e.target.value)}
                  disabled={loading}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />
                <Button variant="outlined" onClick={() => setCreatingChannel(false)} sx={{ mr: 1 }}>
                  Back to Channel Selection
                </Button>
              </>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  const getActionButton = () => {
    switch (activeStep) {
      case 0:
        return (
          <Button onClick={handleSendOtp} variant="contained" disabled={!phoneNumber || loading}>
            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
          </Button>
        );

      case 1:
        return (
          <Button onClick={handleVerifyOtp} variant="contained" disabled={!otp || loading}>
            {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
          </Button>
        );

      case 2:
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {creatingChannel ? (
              <Button onClick={handleCreateChannel} variant="contained" disabled={!newChannelName || loading}>
                {loading ? <CircularProgress size={24} /> : 'Create Channel'}
              </Button>
            ) : (
              <Button onClick={handleSelectChannel} variant="contained" disabled={!selectedChannel || loading}>
                Select Channel
              </Button>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Connect Telegram Account</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {renderStepContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        {getActionButton()}
      </DialogActions>
    </Dialog>
  );
};

export default TelegramVerificationModal;
