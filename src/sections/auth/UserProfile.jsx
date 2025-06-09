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
import { useSelector } from 'react-redux';

// ================================|| LOGIN ||================================ //

const UserSchema = Yup.object().shape({
  email: Yup.string().required('Please enter a email').email('Please enter valid email')
  // password: Yup.string().required('Password is required')
});

export default function UserProfile() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cancelCheckFile, setCancelCheckFile] = useState(null);
  const [cancelCheckPreview, setCancelCheckPreview] = useState(null);

   const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile, 'Demkrf');

    // handleUpload(file);

    // Create a preview
    const previewUrl = URL.createObjectURL(selectedFile);
    console.log(previewUrl, 'Demk');
    setPreview(previewUrl);
  };

  const handleCancelCheckFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setCancelCheckFile(selectedFile);
    console.log(selectedFile, 'Demkrf');

    // handleUpload(file);

    // Create a preview
    const previewUrl = URL.createObjectURL(selectedFile);
    console.log(previewUrl, 'Demk');
    setCancelCheckPreview(previewUrl);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      userId: '',
      password: ''
    },
    validationSchema: UserSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // setLoading(true);
        // console.log(values, 'dlmekrnfj');
        // const params = {
        //   email: values.email,
        //   userId: values.userId
        // };
        // let response = await dispatch(sendOtpApi(params));
        // response = unwrapResult(response);
        // console.log(response, 'Dmrf');
        // if (response?.message === 'OTP sent successfully.') {
        //   enqueueSnackbar('Otp sent successfully. Please check your email', {
        //     variant: 'success'
        //   });
        //   setLoading(false);
        //   setOtpVisible(true);
        // } else if (response?.message === 'Getting Invalid UserName.') {
        //   enqueueSnackbar('Getting Invalid UserName. Please check UserName', {
        //     variant: 'error'
        //   });
        //   setLoading(false);
        // } else {
        //   console.log('dkemkm');
        //   enqueueSnackbar('User Does not exists, Enter user Id to login', {
        //     variant: 'error'
        //   });
        //   setLoading(false);
        // }
        // setSubmitting(false);
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
      <Box mt={4}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Card sx={{ padding: '20px', mx: 4, borderRadius: '16px' }}>
              <Typography variant="h5" mb={2}>
                Basic Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    select
                    fullWidth
                    label="Name Salutation *"
                    name="nameSalutation"
                    value={values.nameSalutation}
                    {...getFieldProps('nameSalutation')}
                    error={Boolean(touched.nameSalutation && errors.nameSalutation)}
                    helperText={touched.nameSalutation && errors.nameSalutation}
                  >
                    {_.map(nameSalOpts, (opt, ind) => (
                      <MenuItem value={opt.value} key={`nameSal-${ind}`}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="User's Name"
                    name="userName"
                    value={values.userName}
                    {...getFieldProps('userName')}
                    error={touched.userName && errors.userName}
                    helperText={touched.userName && errors.userName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  {/* Fixed: removed size prop and added item prop */}
                  <TextField
                    fullWidth
                    // type="number"
                    label="Aadhar Card Number"
                    name="aadharCardNumber"
                    value={values.aadharCardNumber}
                    {...getFieldProps('aadharCardNumber')}
                    error={touched.aadharCardNumber && errors.aadharCardNumber}
                    helperText={touched.aadharCardNumber && errors.aadharCardNumber}
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
                    name="acountHolderName"
                    value={values.acountHolderName}
                    {...getFieldProps('acountHolderName')}
                    error={touched.acountHolderName && errors.acountHolderName}
                    helperText={touched.acountHolderName && errors.acountHolderName}
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
