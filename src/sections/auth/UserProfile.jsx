import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Fade,
  Alert,
  InputAdornment,
  Chip,
  FormHelperText
} from '@mui/material';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { CloudUpload, CheckCircle, CreditCard, AccountBalance, Description, Lock, Security, Visibility, VisibilityOff, Delete, Refresh } from '@mui/icons-material';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDataByUserNameApi,
  updateKycByUserNameApi,
  uploadAadharCardImageApi,
  uploadCancelCheckImageApi
} from '../../store/auth/authApi';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { styled } from '@mui/material/styles';

// ================================|| CUSTOM STYLES ||================================ //

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-root': {
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  '& .MuiStepConnector-line': {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 1,
  },
  '&.Mui-active .MuiStepConnector-line': {
    backgroundColor: theme.palette.primary.main,
  },
  '&.Mui-completed .MuiStepConnector-line': {
    backgroundColor: theme.palette.success.main,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, icon } = props;

  const icons = {
    1: <Security />,
    2: <CreditCard />,
    3: <AccountBalance />,
    4: <Description />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }}>
      {completed ? <CheckCircle /> : icons[icon]}
    </ColorlibStepIconRoot>
  );
}

const UploadZone = styled(Paper)(({ theme, error }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  border: `2px dashed ${error ? theme.palette.error.main : theme.palette.divider}`,
  backgroundColor: error ? 'rgba(211, 47, 47, 0.04)' : 'rgba(0, 0, 0, 0.02)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
    backgroundColor: error ? 'rgba(211, 47, 47, 0.08)' : 'rgba(25, 118, 210, 0.04)',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

// ================================|| VALIDATION SCHEMAS ||================================ //

const Step1Schema = Yup.object().shape({
  adhaarCardNumber: Yup.string()
    .required('Aadhar Card Number is required')
    .matches(/^\d{12}$/, 'Must be exactly 12 digits'),
  panCardNumber: Yup.string()
    .required('PAN Card Number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
});

const Step2Schema = Yup.object().shape({
  accountHolderName: Yup.string()
    .required('Account Holder Name is required')
    .min(3, 'Name must be at least 3 characters'),
  ifscCode: Yup.string()
    .required('IFSC Code is required')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code format'),
  accountNumber: Yup.string()
    .required('Account Number is required')
    .matches(/^\d{9,18}$/, 'Account number must be 9-18 digits'),
});

const steps = ['Personal Details', 'Bank Information', 'Document Upload', 'Review & Submit'];

// ================================|| USER PROFILE ||================================ //

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [stepValidations, setStepValidations] = useState({
    step1: false,
    step2: false,
    step3: false
  });
  const [touchedFields, setTouchedFields] = useState({
    adhaarCardNumber: false,
    panCardNumber: false,
    accountHolderName: false,
    ifscCode: false,
    accountNumber: false
  });
  
  // File input refs
  const aadharFileInputRef = useRef(null);
  const cancelCheckFileInputRef = useRef(null);
  
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cancelCheckFile, setCancelCheckFile] = useState(null);
  const [cancelCheckPreview, setCancelCheckPreview] = useState(null);
  
  const { enqueueSnackbar } = useSnackbar();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const dispatch = useDispatch();

  // Validate step 1
  const validateStep1 = async () => {
    try {
      await Step1Schema.validate(formik.values, { abortEarly: false });
      setStepValidations(prev => ({ ...prev, step1: true }));
      return true;
    } catch (error) {
      setTouchedFields(prev => ({
        ...prev,
        adhaarCardNumber: true,
        panCardNumber: true
      }));
      setStepValidations(prev => ({ ...prev, step1: false }));
      
      const errors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      
      Object.keys(errors).forEach(field => {
        formik.setFieldError(field, errors[field]);
      });
      
      return false;
    }
  };

  // Validate step 2
  const validateStep2 = async () => {
    try {
      await Step2Schema.validate(formik.values, { abortEarly: false });
      setStepValidations(prev => ({ ...prev, step2: true }));
      return true;
    } catch (error) {
      setTouchedFields(prev => ({
        ...prev,
        accountHolderName: true,
        ifscCode: true,
        accountNumber: true
      }));
      setStepValidations(prev => ({ ...prev, step2: false }));
      
      const errors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      
      Object.keys(errors).forEach(field => {
        formik.setFieldError(field, errors[field]);
      });
      
      return false;
    }
  };

  // Validate step 3
  const validateStep3 = () => {
    const isValid = file && cancelCheckFile;
    setStepValidations(prev => ({ ...prev, step3: isValid }));
    return isValid;
  };

  const handleNext = async () => {
    let isValid = false;
    
    switch (activeStep) {
      case 0:
        isValid = await validateStep1();
        break;
      case 1:
        isValid = await validateStep2();
        break;
      case 2:
        isValid = validateStep3();
        if (!isValid) {
          enqueueSnackbar('Please upload both documents before continuing', {
            variant: 'error',
          });
        }
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedExtensions.includes(fileExt)) {
      enqueueSnackbar('Please upload only JPG, JPEG, or PNG files', {
        variant: 'error',
      });
      event.target.value = '';
      return;
    }

    if (selectedFile.size > maxSize) {
      enqueueSnackbar('File size must be less than 5MB', {
        variant: 'error',
      });
      event.target.value = '';
      return;
    }

    if (type === 'aadhar') {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setCancelCheckFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setCancelCheckPreview(previewUrl);
    }
    
    if (activeStep === 2) {
      validateStep3();
    }
  };

  const handleFileRemove = (type) => {
    if (type === 'aadhar') {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(null);
      setPreview(null);
      
      if (aadharFileInputRef.current) {
        aadharFileInputRef.current.value = '';
      }
    } else {
      if (cancelCheckPreview) {
        URL.revokeObjectURL(cancelCheckPreview);
      }
      setCancelCheckFile(null);
      setCancelCheckPreview(null);
      
      if (cancelCheckFileInputRef.current) {
        cancelCheckFileInputRef.current.value = '';
      }
    }
    
    if (activeStep === 2) {
      validateStep3();
    }
  };

  const handleFileReplace = (type) => {
    if (type === 'aadhar') {
      // First remove the current file
      handleFileRemove('aadhar');
      
      // Then open file picker after a small delay
      setTimeout(() => {
        if (aadharFileInputRef.current) {
          aadharFileInputRef.current.click();
        }
      }, 10);
    } else {
      // First remove the current file
      handleFileRemove('cancelCheck');
      
      // Then open file picker after a small delay
      setTimeout(() => {
        if (cancelCheckFileInputRef.current) {
          cancelCheckFileInputRef.current.click();
        }
      }, 10);
    }
  };

  const handleUploadZoneClick = (type) => {
    if (type === 'aadhar') {
      if (aadharFileInputRef.current) {
        aadharFileInputRef.current.click();
      }
    } else {
      if (cancelCheckFileInputRef.current) {
        cancelCheckFileInputRef.current.click();
      }
    }
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
  };

  const formik = useFormik({
    initialValues: {
      adhaarCardNumber: '',
      panCardNumber: '',
      accountHolderName: '',
      ifscCode: '',
      accountNumber: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!file || !cancelCheckFile) {
          enqueueSnackbar('Please upload both documents before submitting', {
            variant: 'error',
          });
          return;
        }

        const step1Valid = await validateStep1();
        const step2Valid = await validateStep2();
        const step3Valid = validateStep3();

        if (!step1Valid || !step2Valid || !step3Valid) {
          enqueueSnackbar('Please fix all validation errors before submitting', {
            variant: 'error',
          });
          return;
        }

        setLoading(true);
        const reqBody = { ...values };
        reqBody.userName = selectedUserDetails?.userName;
        
        const token = await localStorage.getItem('accessToken');
        
        // Upload files
        const aadharFormData = new FormData();
        aadharFormData.append('userName', selectedUserDetails?.userName);
        aadharFormData.append('image', file);
        await dispatch(uploadAadharCardImageApi(aadharFormData));

        const cancelCheckFormData = new FormData();
        cancelCheckFormData.append('userName', selectedUserDetails?.userName);
        cancelCheckFormData.append('image', cancelCheckFile);
        await dispatch(uploadCancelCheckImageApi(cancelCheckFormData));

        // Update KYC
        await dispatch(updateKycByUserNameApi(reqBody));
        await dispatch(getUserDataByUserNameApi({ token }));

        enqueueSnackbar('KYC submitted successfully!', {
          variant: 'success',
        });

        setLoading(false);
        navigate('/payment-page');
      } catch (error) {
        console.error(error);
        setLoading(false);
        setSubmitting(false);
        enqueueSnackbar(
          error?.message || 'Something went wrong. Please try again.',
          { variant: 'error' }
        );
      }
    },
  });

  const { errors, values, handleSubmit, setFieldValue } = formik;

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={3} color="primary">
                Personal Identification
              </Typography>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                Please enter your official identification details exactly as they appear on your documents.
              </Alert>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    disabled
                    value={selectedUserDetails?.name || ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Avatar sx={{ width: 24, height:24 }}>
                            {selectedUserDetails?.name?.charAt(0) || 'U'}
                          </Avatar>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'action.hover',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    disabled
                    value={selectedUserDetails?.phoneNumber?.slice(-10) || ''}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'action.hover',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Aadhar Card Number *"
                    variant="outlined"
                    value={values.adhaarCardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                      setFieldValue('adhaarCardNumber', value);
                    }}
                    onBlur={() => handleFieldBlur('adhaarCardNumber')}
                    error={touchedFields.adhaarCardNumber && Boolean(errors.adhaarCardNumber)}
                    helperText={touchedFields.adhaarCardNumber && errors.adhaarCardNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    placeholder="Enter 12-digit Aadhar number"
                  />
                  {!touchedFields.adhaarCardNumber && (
                    <FormHelperText sx={{ ml: 1.5, mt: 0.5 }}>
                      12-digit unique identification number
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="PAN Card Number *"
                    variant="outlined"
                    value={values.panCardNumber}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                      setFieldValue('panCardNumber', value);
                    }}
                    onBlur={() => handleFieldBlur('panCardNumber')}
                    error={touchedFields.panCardNumber && Boolean(errors.panCardNumber)}
                    helperText={touchedFields.panCardNumber && errors.panCardNumber}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    placeholder="ABCDE1234F"
                  />
                  {!touchedFields.panCardNumber && (
                    <FormHelperText sx={{ ml: 1.5, mt: 0.5 }}>
                      Format: ABCDE1234F (all uppercase)
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Fade>
        );

      case 1:
        return (
          <Fade in={true}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={3} color="secondary">
                Bank Account Details
              </Typography>
              <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
                Ensure bank details match exactly with your bank records. Incorrect information may lead to transaction failures.
              </Alert>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account Holder's Name *"
                    variant="outlined"
                    value={values.accountHolderName}
                    onChange={(e) => setFieldValue('accountHolderName', e.target.value)}
                    onBlur={() => handleFieldBlur('accountHolderName')}
                    error={touchedFields.accountHolderName && Boolean(errors.accountHolderName)}
                    helperText={touchedFields.accountHolderName && errors.accountHolderName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CreditCard fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    placeholder="As per bank records"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="IFSC Code *"
                    variant="outlined"
                    value={values.ifscCode}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 11);
                      setFieldValue('ifscCode', value);
                    }}
                    onBlur={() => handleFieldBlur('ifscCode')}
                    error={touchedFields.ifscCode && Boolean(errors.ifscCode)}
                    helperText={touchedFields.ifscCode && errors.ifscCode}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    placeholder="ABCD0123456"
                  />
                  {!touchedFields.ifscCode && (
                    <FormHelperText sx={{ ml: 1.5, mt: 0.5 }}>
                      Format: ABCD0123456
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Account Number *"
                    variant="outlined"
                    type={showAccountNumber ? 'text' : 'password'}
                    value={values.accountNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 18);
                      setFieldValue('accountNumber', value);
                    }}
                    onBlur={() => handleFieldBlur('accountNumber')}
                    error={touchedFields.accountNumber && Boolean(errors.accountNumber)}
                    helperText={touchedFields.accountNumber && errors.accountNumber}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowAccountNumber(!showAccountNumber)}
                            edge="end"
                            size="small"
                          >
                            {showAccountNumber ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                    placeholder="9-18 digit account number"
                  />
                  {!touchedFields.accountNumber && (
                    <FormHelperText sx={{ ml: 1.5, mt: 0.5 }}>
                      9-18 digit account number
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Fade>
        );

      case 2:
        return (
          <Fade in={true}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={3} color="info">
                Document Verification
              </Typography>
              <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                Upload clear, readable images of your documents. Max file size: 5MB each.
              </Alert>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <UploadZone
                    error={!file && activeStep === 2 && stepValidations.step3 === false}
                    onClick={() => handleUploadZoneClick('aadhar')}
                  >
                    <input
                      ref={aadharFileInputRef}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'aadhar')}
                    />
                    
                    {preview ? (
                      <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="subtitle1" fontWeight="600" color="success.main">
                            ✓ PAN Selfie Uploaded
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Refresh />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileReplace('aadhar');
                            }}
                            sx={{ ml: 1 }}
                          >
                            Change
                          </Button>
                        </Box>
                        <Box
                          component="img"
                          src={preview}
                          alt="PAN Selfie Preview"
                          sx={{
                            width: '100%',
                            maxHeight: 200,
                            borderRadius: 2,
                            objectFit: 'contain',
                            backgroundColor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          {file?.name || 'PAN Selfie Image'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: 'primary.contrastText' }} />
                        </Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          Upload PAN Selfie *
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Click to upload or drag and drop
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          JPG, JPEG or PNG • Max 5MB
                        </Typography>
                        {!file && activeStep === 2 && stepValidations.step3 === false && (
                          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                            * This field is required
                          </Typography>
                        )}
                      </Box>
                    )}
                  </UploadZone>
                </Grid>

                <Grid item xs={12} md={6}>
                  <UploadZone
                    error={!cancelCheckFile && activeStep === 2 && stepValidations.step3 === false}
                    onClick={() => handleUploadZoneClick('cancelCheck')}
                  >
                    <input
                      ref={cancelCheckFileInputRef}
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => handleFileChange(e, 'cancelCheck')}
                    />
                    
                    {cancelCheckPreview ? (
                      <Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Typography variant="subtitle1" fontWeight="600" color="success.main">
                            ✓ Cancel Check Uploaded
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Refresh />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileReplace('cancelCheck');
                            }}
                            sx={{ ml: 1 }}
                          >
                            Change
                          </Button>
                        </Box>
                        <Box
                          component="img"
                          src={cancelCheckPreview}
                          alt="Cancel Check Preview"
                          sx={{
                            width: '100%',
                            maxHeight: 200,
                            borderRadius: 2,
                            objectFit: 'contain',
                            backgroundColor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          {cancelCheckFile?.name || 'Cancel Check Image'}
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'secondary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 16px',
                          }}
                        >
                          <CloudUpload sx={{ fontSize: 40, color: 'primary.contrastText' }} />
                        </Box>
                        <Typography variant="h6" fontWeight="600" gutterBottom>
                          Upload Cancel Check *
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          Click to upload or drag and drop
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          JPG, JPEG or PNG • Max 5MB
                        </Typography>
                        {!cancelCheckFile && activeStep === 2 && stepValidations.step3 === false && (
                          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                            * This field is required
                          </Typography>
                        )}
                      </Box>
                    )}
                  </UploadZone>
                </Grid>
              </Grid>
            </Card>
          </Fade>
        );

      case 3:
        return (
          <Fade in={true}>
            <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="600" mb={3} color="success">
                Review & Confirm
              </Typography>
              <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                Please review all information before submitting. This cannot be changed later.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Personal Details
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>Name:</strong> {selectedUserDetails?.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Aadhar:</strong> {values.adhaarCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                      </Typography>
                      <Typography variant="body2">
                        <strong>PAN:</strong> {values.panCardNumber}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Bank Details
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>Account Name:</strong> {values.accountHolderName}
                      </Typography>
                      <Typography variant="body2">
                        <strong>IFSC Code:</strong> {values.ifscCode}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Account Number:</strong> {showAccountNumber ? values.accountNumber : '••••••••' + values.accountNumber?.slice(-4)}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 2, backgroundColor: 'grey.50' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Documents Uploaded
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
                      <Chip
                        icon={file ? <CheckCircle /> : <Delete />}
                        label={file ? `PAN Selfie: ${file.name.substring(0, 20)}${file.name.length > 20 ? '...' : ''}` : "PAN Selfie ❌"}
                        color={file ? "success" : "error"}
                        variant={file ? "filled" : "outlined"}
                        onDelete={file ? () => handleFileRemove('aadhar') : undefined}
                        deleteIcon={<Delete />}
                      />
                      <Chip
                        icon={cancelCheckFile ? <CheckCircle /> : <Delete />}
                        label={cancelCheckFile ? `Cancel Check: ${cancelCheckFile.name.substring(0, 20)}${cancelCheckFile.name.length > 20 ? '...' : ''}` : "Cancel Check ❌"}
                        color={cancelCheckFile ? "success" : "error"}
                        variant={cancelCheckFile ? "filled" : "outlined"}
                        onDelete={cancelCheckFile ? () => handleFileRemove('cancelCheck') : undefined}
                        deleteIcon={<Delete />}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Card>
          </Fade>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: 4,
        px: { xs: 2, md: 4 },
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          mb: 4,
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(45deg, #1976d2 0%, #115293 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%)',
          },
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={3}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {selectedUserDetails?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box flex={1}>
            <Typography variant="h4" fontWeight="800" gutterBottom>
              Complete Your KYC Verification
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Secure your account with identity verification. All fields are mandatory.
            </Typography>
          </Box>
          <Chip
            label="Secure & Encrypted"
            icon={<Lock />}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontWeight: 600,
            }}
          />
        </Stack>
      </Paper>

      {/* Progress Stepper */}
      <Box sx={{ mb: 6, px: { xs: 1, md: 8 } }}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography variant="subtitle2" fontWeight="600">
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* Main Content */}
          <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
            {getStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 4,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  fontWeight: 600,
                }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <LoadingButton
                  variant="contained"
                  type="submit"
                  size="large"
                  loading={loading}
                  disabled={!file || !cancelCheckFile}
                  sx={{
                    borderRadius: 2,
                    px: 6,
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #4caf50 30%, #2e7d32 90%)',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #388e3c 30%, #1b5e20 90%)',
                      boxShadow: '0 4px 8px 2px rgba(76, 175, 80, .4)',
                    },
                  }}
                  startIcon={<CheckCircle />}
                >
                  {loading ? 'Submitting...' : 'Submit KYC'}
                </LoadingButton>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="large"
                  sx={{
                    borderRadius: 2,
                    px: 6,
                    fontWeight: 600,
                    boxShadow: 3,
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>

            {/* Step Indicator */}
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                textAlign: 'center',
                mt: 2,
                fontWeight: 500,
              }}
            >
              Step {activeStep + 1} of {steps.length} • All fields are mandatory
            </Typography>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
}