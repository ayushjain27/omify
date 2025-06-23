import {
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
import { getUserDataByUserNameApi, updateKycByUserNameApi, uploadAadharCardImageApi, uploadCancelCheckImageApi } from '../../store/auth/authApi';
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
    formData.append('file', file);
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
    formData.append('file', cancelCheckFile);

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
      <Box sx={{ backgroundColor: 'black', padding: '20px' }}>
        <Typography variant="h1" color="white" textAlign="center">
          Profile
        </Typography>
      </Box>
      <Box>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
              <LoadingButton variant="contained" type="submit" sx={{ mt: 2, mb: 2, marginRight: '2%', width: '10%' }} color="success" loading={loading}>
                {loading ? 'Submitting in...' : 'Submit'}
              </LoadingButton>
            </Box>
            <Card sx={{ padding: '20px', mx: 4, borderRadius: '16px' }}>
              <Typography variant="h5" mb={2}>
                Basic Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    name="name"
                    disabled={true}
                    value={selectedUserDetails.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    name="phoneNumber"
                    disabled={true}
                    value={selectedUserDetails?.phoneNumber?.slice(-10)}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="Aadhar Card Number"
                    name="adhaarCardNumber"
                    value={values.adhaarCardNumber}
                    {...getFieldProps('adhaarCardNumber')}
                    error={touched.adhaarCardNumber && errors.adhaarCardNumber}
                    helperText={touched.adhaarCardNumber && errors.adhaarCardNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="Pan Card Number"
                    name="panCardNumber"
                    value={values.panCardNumber}
                    {...getFieldProps('panCardNumber')}
                    error={touched.panCardNumber && errors.panCardNumber}
                    helperText={touched.panCardNumber && errors.panCardNumber}
                  />
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ padding: '20px', mx: 4, borderRadius: '16px', mt: 2 }}>
              <Typography variant="h5" mb={2}>
                Bank Details Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="Account Holder's Name"
                    name="accountHolderName"
                    value={values.accountHolderName}
                    {...getFieldProps('accountHolderName')}
                    error={touched.accountHolderName && errors.accountHolderName}
                    helperText={touched.accountHolderName && errors.accountHolderName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="Ifsc Code"
                    name="ifscCode"
                    value={values.ifscCode}
                    {...getFieldProps('ifscCode')}
                    error={touched.ifscCode && errors.ifscCode}
                    helperText={touched.ifscCode && errors.ifscCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    type="number"
                    label="Account Number"
                    name="accountNumber"
                    value={values.accountNumber}
                    {...getFieldProps('accountNumber')}
                    error={touched.accountNumber && errors.accountNumber}
                    helperText={touched.accountNumber && errors.accountNumber}
                  />
                </Grid>
              </Grid>
            </Card>
            <Card sx={{ padding: '20px', mx: 4, borderRadius: '16px', mt: 2 }}>
              <Typography variant="h5" mb={2}>
                Upload Images
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' } // Column on mobile, row on larger screens
                }}
              >
                {preview ? (
                  <div>
                    <h3>Uploaded Image:</h3>
                    {/* Fetch and display the uploaded image */}
                    <img src={preview} alt="Uploaded" style={{ maxWidth: '300px' }} />
                  </div>
                ) : (
                  <Box border={1} borderColor="grey.400" borderRadius={1} p={2} textAlign="center" mt={2} mb={2}>
                    <IconButton color="primary" component="label">
                      <CloudUpload />
                      <input hidden accept="image/png, image/jpeg" type="file" onChange={handleFileChange} />
                      {/* <input hidden accept="image/png, image/jpeg, image/jpg" type="file" /> */}
                    </IconButton>
                    {/* <Typography></Typography> */}
                    <Typography variant="body2" color="textSecondary">
                      Browse files from your system
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Upload Pan Selfie Image
                    </Typography>
                  </Box>
                )}
                {cancelCheckPreview ? (
                  <div>
                    <h3>Uploaded Image:</h3>
                    {/* Fetch and display the uploaded image */}
                    <img src={cancelCheckPreview} alt="Uploaded" style={{ maxWidth: '300px' }} />
                  </div>
                ) : (
                  <Box
                    sx={{ marginLeft: { xs: '20px' } }}
                    border={1}
                    borderColor="grey.400"
                    borderRadius={1}
                    p={2}
                    textAlign="center"
                    mt={2}
                    mb={2}
                  >
                    <IconButton color="primary" component="label">
                      <CloudUpload />
                      <input hidden accept="image/png, image/jpeg, image/jpg" type="file" onChange={handleCancelCheckFileChange} />
                      {/* <input hidden accept="image/png, image/jpeg, image/jpg" type="file" /> */}
                    </IconButton>
                    {/* <Typography></Typography> */}
                    <Typography variant="body2" color="textSecondary">
                      Browse files from your system
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      Upload Cancel Check Image
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
}
