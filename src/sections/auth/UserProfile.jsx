import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { nameSalOpts } from '../../utils/constant';
import _ from 'lodash';
import { CloudUpload } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDataByUserNameApi,
  updateKycByUserNameApi,
  uploadAadharCardImageApi,
  uploadCancelCheckImageApi
} from '../../store/auth/authApi';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';

// ================================|| LOGIN ||================================ //

const UserSchema = Yup.object().shape({
  adhaarCardNumber: Yup.string().required('Please enter a Aadhar Card Number'),
  panCardNumber: Yup.string().required('Please enter a Pan Card Number'),
  accountHolderName: Yup.string().required('Please enter a Account Holder Name'),
  ifscCode: Yup.string().required('Please enter a Ifsc code'),
  accountNumber: Yup.string().required('Please enter a Account Number')
});

export default function UserProfile() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cancelCheckFile, setCancelCheckFile] = useState(null);
  const [cancelCheckPreview, setCancelCheckPreview] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();

    // Validate file type
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(fileExt)) {
      enqueueSnackbar('Please upload only JPG, JPEG, or PNG files', {
        variant: 'error'
      });
      return;
    }
    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('userName', selectedUserDetails?.userName);
    formData.append('image', file);
    try {
      await dispatch(uploadAadharCardImageApi(formData));
    } catch (error) {
      enqueueSnackbar(`Failed to upload the file. ${error || error.message}`, {
        variant: 'error'
      });
    } finally {
      // setUploading(false);
    }
  };

  const handleCancelCheckFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();

    // Validate file type
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(fileExt)) {
      enqueueSnackbar('Please upload only JPG, JPEG, or PNG files', {
        variant: 'error'
      });
      return;
    }
    setCancelCheckFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setCancelCheckPreview(previewUrl);
  };

  const handleCancelCheckImageUpload = async () => {
    const formData = new FormData();
    formData.append('userName', selectedUserDetails?.userName);
    formData.append('image', cancelCheckFile);

    try {
      await dispatch(uploadCancelCheckImageApi(formData));
    } catch (error) {
      enqueueSnackbar(`Failed to upload the file. ${error || error.message}`, {
        variant: 'error'
      });
    } finally {
      // setUploading(false);
    }
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      adhaarCardNumber: '',
      panCardNumber: '',
      accountHolderName: '',
      ifscCode: '',
      accountNumber: ''
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        let token = await localStorage.getItem('accessToken');
        setLoading(true);
        const reqBody = { ...values };
        reqBody.userName = selectedUserDetails?.userName;
        console.log(reqBody, 'lfnlken2k');
        await dispatch(updateKycByUserNameApi(reqBody));
        await dispatch(getUserDataByUserNameApi({ token: token }));
        await handleUpload();
        await handleCancelCheckImageUpload();
        setLoading(false);
        navigate('/payment-page');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({
          afterSubmit: error?.message || 'Something went wrong. Please check your credentials and try again.'
        });
        // }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: '100vh',
          py: 4
        }}
      >
        {/* Profile Header */}
        <Paper
          sx={{
            mx: 4,
            mb: 4,
            p: 4,
            borderRadius: 3,
            background: 'linear-gradient(45deg, #3a4ba3 0%, #25316D 100%)',
            color: 'white',
            boxShadow: 3
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '2rem'
              }}
            >
              {selectedUserDetails?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {selectedUserDetails?.name || 'User Profile'}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Complete your KYC verification
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Box sx={{ mx: 4 }}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              {/* Submit Button - Top */}
              <Box display="flex" justifyContent="flex-end" mb={3}>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                  color="primary"
                  loading={loading}
                >
                  {loading ? 'Processing...' : 'Submit KYC'}
                </LoadingButton>
              </Box>

              {/* Basic Info Card */}
              <Card
                sx={{
                  p: 4,
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main'
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
                  Basic Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      disabled
                      value={selectedUserDetails.name}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(0,0,0,0.02)'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      disabled
                      value={selectedUserDetails?.phoneNumber?.slice(-10)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'rgba(0,0,0,0.02)'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Aadhar Card Number"
                      variant="outlined"
                      {...getFieldProps('adhaarCardNumber')}
                      error={Boolean(touched.adhaarCardNumber && errors.adhaarCardNumber)}
                      helperText={touched.adhaarCardNumber && errors.adhaarCardNumber}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="PAN Card Number"
                      variant="outlined"
                      {...getFieldProps('panCardNumber')}
                      error={Boolean(touched.panCardNumber && errors.panCardNumber)}
                      helperText={touched.panCardNumber && errors.panCardNumber}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>

              {/* Bank Details Card */}
              <Card
                sx={{
                  p: 4,
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                  borderLeft: '4px solid',
                  borderColor: 'secondary.main'
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={3} color="secondary">
                  Bank Details
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Account Holder's Name"
                      variant="outlined"
                      {...getFieldProps('accountHolderName')}
                      error={Boolean(touched.accountHolderName && errors.accountHolderName)}
                      helperText={touched.accountHolderName && errors.accountHolderName}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      variant="outlined"
                      {...getFieldProps('ifscCode')}
                      error={Boolean(touched.ifscCode && errors.ifscCode)}
                      helperText={touched.ifscCode && errors.ifscCode}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      variant="outlined"
                      type="number"
                      {...getFieldProps('accountNumber')}
                      error={Boolean(touched.accountNumber && errors.accountNumber)}
                      helperText={touched.accountNumber && errors.accountNumber}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Card>

              {/* Document Upload Card */}
              <Card
                sx={{
                  p: 4,
                  borderRadius: 3,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
                  borderLeft: '4px solid',
                  borderColor: 'info.main'
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={3} color="info">
                  Document Upload
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        border: '2px dashed',
                        borderColor: 'grey.400',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                      }}
                    >
                      {preview ? (
                        <Box>
                          <Typography variant="subtitle1" mb={2}>
                            PAN Selfie Uploaded
                          </Typography>
                          <Box
                            component="img"
                            src={preview}
                            alt="PAN Selfie Preview"
                            sx={{
                              maxWidth: '100%',
                              maxHeight: 200,
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <IconButton
                            color="primary"
                            component="label"
                            sx={{
                              mb: 1,
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.2)'
                              }
                            }}
                          >
                            <CloudUpload fontSize="large" />
                            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                          </IconButton>
                          <Typography variant="h6" color="text.primary" gutterBottom>
                            Upload PAN Selfie
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            JPG, JPEG or PNG (Max 5MB)
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center',
                        border: '2px dashed',
                        borderColor: 'grey.400',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(25, 118, 210, 0.04)'
                        }
                      }}
                    >
                      {cancelCheckPreview ? (
                        <Box>
                          <Typography variant="subtitle1" mb={2}>
                            Cancel Check Uploaded
                          </Typography>
                          <Box
                            component="img"
                            src={cancelCheckPreview}
                            alt="Cancel Check Preview"
                            sx={{
                              maxWidth: '100%',
                              maxHeight: 200,
                              borderRadius: 1,
                              border: '1px solid',
                              borderColor: 'divider'
                            }}
                          />
                        </Box>
                      ) : (
                        <Box>
                          <IconButton
                            color="primary"
                            component="label"
                            sx={{
                              mb: 1,
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.2)'
                              }
                            }}
                          >
                            <CloudUpload fontSize="large" />
                            <input hidden accept="image/*" type="file" onChange={handleCancelCheckFileChange} />
                          </IconButton>
                          <Typography variant="h6" color="text.primary" gutterBottom>
                            Upload Cancel Check
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            JPG, JPEG or PNG (Max 5MB)
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </Card>
            </Form>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
