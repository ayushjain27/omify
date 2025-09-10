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
  CardContent
} from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { telegramSendOtpApi } from '../../store/telegram/telegramApi';
import { unwrapResult } from '@reduxjs/toolkit';

const TelegramVerificationModal = ({ open, onClose, onVerificationComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [groups, setGroups] = useState([]);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
      setActiveStep(0);
      setPhoneNumber('');
      setOtp('');
      setLoading(false);
      setError('');
      setGroups([]);
      setVerified(false);
    }
  }, [open]);

  const checkIfAlreadyVerified = async () => {
    try {
      setLoading(true);
      // const response = await axios.post('/api/telegram/send-otp', {
      //   phoneNumber
      // });
      const data = {
        phoneNumber
      }
      let response = await dispatch(telegramSendOtpApi(data));
      response = unwrapResult(response)
      

      if (response.data.verified) {
        setVerified(true);
        // User already verified, fetch groups
        const groupsResponse = await axios.get(`/api/telegram/groups/${userId}`);
        setGroups(groupsResponse.data.groups);
        setActiveStep(2);
      } else {
        setActiveStep(1);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to check verification status');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      setError('');
      await axios.post('/api/telegram/send-otp', {
        phoneNumber
      });
      setActiveStep(1);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/api/telegram/verify-otp', {
        phoneNumber,
        otp,
        userId: getUserID() // You need to implement this function to get current user ID
      });

      setGroups(response.data.groups);
      setVerified(true);
      setActiveStep(2);
      onVerificationComplete(response.data.groups);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Enter Phone Number', 'Verify OTP', 'Select Group'];

  const getUserID = () => {
    // Implement this based on your auth system
    return localStorage.getItem('userId') || 'user-id-placeholder';
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
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {activeStep === 0 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter your Telegram phone number to verify your account
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              disabled={loading}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Enter the OTP sent to your Telegram account
            </Typography>
            <TextField fullWidth label="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} />
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {verified ? 'Your Telegram groups:' : 'Verification completed!'}
            </Typography>

            {groups.length > 0 ? (
              <Grid container spacing={2}>
                {groups.map((group) => (
                  <Grid item xs={12} sm={6} key={group.id || group.groupId}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6">{group.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          Members: {group.memberCount}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No groups found or you haven't created any groups yet.
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        {activeStep === 0 && (
          <Button onClick={checkIfAlreadyVerified} variant="contained" disabled={!phoneNumber || loading}>
            {loading ? <CircularProgress size={24} /> : 'Continue'}
          </Button>
        )}
        {activeStep === 1 && (
          <Button onClick={handleVerifyOtp} variant="contained" disabled={!otp || loading}>
            {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
          </Button>
        )}
        {activeStep === 2 && (
          <Button onClick={onClose} variant="contained">
            Done
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default TelegramVerificationModal;
