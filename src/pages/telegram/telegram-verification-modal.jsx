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
  Alert
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { telegramSendOtpApi, telegramVerifyOtpApi, telegramVerify2FAApi } from '../../store/telegram/telegramApi';
import { unwrapResult } from '@reduxjs/toolkit';

const TelegramVerificationModal = ({ open, onClose, onVerificationComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [channels, setChannels] = useState([]);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setActiveStep(0);
      setPhoneNumber('');
      setOtp('');
      setPassword('');
      setLoading(false);
      setError('');
      setSuccess('');
      setRequires2FA(false);
      setChannels([]);
      setVerified(false);
    }
  }, [open]);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const data = { phoneNumber };
      const response = await dispatch(telegramSendOtpApi(data));
      const result = unwrapResult(response);
      
      if (result.success) {
        if (result.verified && result.hasSession) {
          // User already has an active session
          setVerified(true);
          setChannels(result.channels || []);
          setActiveStep(2);
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
      
      const data = { phoneNumber, otp };
      const response = await dispatch(telegramVerifyOtpApi(data));
      const result = unwrapResult(response);
      
      if (result.success) {
        // Successful verification
        setVerified(true);
        setChannels(result.channels || []);
        setActiveStep(2);
        setSuccess('Login successful!');
        if (onVerificationComplete) {
          onVerificationComplete(result.channels || []);
        }
      } else if (result.requires2FA) {
        // 2FA required
        setRequires2FA(true);
        setSuccess('Two-factor authentication is enabled. Please provide your password.');
      } else {
        setError(result.message || 'Failed to verify OTP');
      }
    } catch (error) {
      setError(error.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      const data = { phoneNumber, password };
      const response = await dispatch(telegramVerify2FAApi(data));
      const result = unwrapResult(response);
      
      if (result.success) {
        // Successful 2FA verification
        setVerified(true);
        setChannels(result.channels || []);
        setActiveStep(2);
        setSuccess('Login successful!');
        if (onVerificationComplete) {
          onVerificationComplete(result.channels || []);
        }
      } else {
        setError(result.message || 'Failed to verify password');
      }
    } catch (error) {
      setError(error.message || 'Failed to verify password');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Enter Phone Number', 'Verify Authentication', 'Your Channels'];

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
        if (requires2FA) {
          return (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Two-factor authentication is enabled. Please enter your password.
              </Typography>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
              />
            </Box>
          );
        } else {
          return (
            <Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Enter the OTP sent to your Telegram account
              </Typography>
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
                sx={{ mb: 2 }}
              />
            </Box>
          );
        }
      
      case 2:
        return (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your Telegram channels and groups:
            </Typography>

            {channels.length > 0 ? (
              <Grid container spacing={2}>
                {channels.map((channel) => (
                  <Grid item xs={12} sm={6} key={channel.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">{channel.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Type: {channel.type}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Members: {channel.memberCount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {channel.isAdmin ? (channel.isCreator ? 'Creator' : 'Admin') : 'Member'}
                        </Typography>
                        {channel.username && (
                          <Typography variant="body2" color="textSecondary">
                            @{channel.username}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No channels or groups found.
              </Typography>
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
          <Button 
            onClick={handleSendOtp} 
            variant="contained" 
            disabled={!phoneNumber || loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Send OTP'}
          </Button>
        );
      
      case 1:
        if (requires2FA) {
          return (
            <Button 
              onClick={handleVerify2FA} 
              variant="contained" 
              disabled={!password || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify Password'}
            </Button>
          );
        } else {
          return (
            <Button 
              onClick={handleVerifyOtp} 
              variant="contained" 
              disabled={!otp || loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
            </Button>
          );
        }
      
      case 2:
        return (
          <Button onClick={onClose} variant="contained">
            Done
          </Button>
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