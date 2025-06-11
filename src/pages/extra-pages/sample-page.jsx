// material-ui
import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  // Grid,
  Card,
  // CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  MenuItem,
  Grid,
  Paper,
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
  Avatar
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router';

// project imports
import MainCard from 'components/MainCard';
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [priceType, setPriceType] = useState('fixed');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [anyFile, setAnyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [anyPreview, setAnyPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState('');

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
  };

  const { selectedUserDetails  } = useSelector(({ authReducer }) => authReducer);

  const [data, setData] = useState({
    price: '',
    pageTitle: '',
    category: 'Finance',
    description: '',
    buttonText: 'Make Payment',
    phoneNumber: '',
    link: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    if (!data?.pageTitle) {
      alert('Please select a page title.');
      return;
    }
    if (!data?.price) {
      alert('Please select a price.');
      return;
    }
    if (!data?.description) {
      alert('Please select a description.');
      return;
    }
    console.log(data, 'dmekfmks');
    let omifyPhoneNumber = localStorage.getItem('omifyUserPhoneNumber');
    const requestData = {
      ...data,
      phoneNumber: omifyPhoneNumber
    };
    const response = await axios.post('http://localhost:12000/paymentPage/create', requestData);
    // console.log(response,"demfkmke")
    let paymentPageId = response?.data?._id;
    console.log(paymentPageId, 'delld');
    await handleUpload(paymentPageId);
    if (anyPreview) {
      await handleAnyFileUpload(paymentPageId);
    }
    navigate('/payment-page');
  };

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

  const handleAnyfileChange = (event) => {
    const selectedFile = event.target.files[0];
    setAnyFile(selectedFile);
    console.log(selectedFile, 'Demkrf');

    // handleUpload(file);

    // Create a preview
    const previewUrl = URL.createObjectURL(selectedFile);
    console.log(previewUrl, 'Demk');
    setAnyPreview(previewUrl);
    alert('File Added');
  };

  const handleUpload = async (paymentPageId) => {
    const formData = new FormData();
    formData.append('paymentPageId', paymentPageId);
    formData.append('image', file);

    setUploading(true);

    console.log(formData, 'dlemrnje');
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post('http://localhost:12000/paymentPage/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data.filePath, 'def');

      setUploadedFilePath(response.data.filePath);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert(`Failed to upload the file. ${error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleAnyFileUpload = async (paymentPageId) => {
    console.log(anyFile, 'ewfe');
    if (!anyFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('paymentPageId', paymentPageId);
    formData.append('file', anyFile);

    // setUploading(true);

    console.log(formData, 'dlemrnje');
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post('http://localhost:12000/paymentPage/uploadAnything', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data.filePath, 'response.data.filePath');

      setUploadedFilePath(response.data.filePath);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert(`Failed to upload the file. ${error || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  console.log(uploadedFilePath, 'demkmk');

  return (
    <>
      <Box>
        {/* Header */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                Upload your Digital Files
              </Typography>

              {/* File Upload Section */}
              <Card
                variant="outlined"
                sx={{
                  borderStyle: 'dashed',
                  textAlign: 'center',
                  padding: '20px',
                  borderRadius: '10px',
                  borderColor: '#E0E0E0',
                  mb: 4
                }}
              >
                <IconButton color="primary" component="label">
                  <CloudUpload />
                  <input hidden type="file" onChange={handleAnyfileChange} />
                </IconButton>
                <Typography variant="body1" sx={{ color: '#E91E63', fontWeight: 'bold', mb: 1 }}>
                  Browse files from your system
                </Typography>
                <Button component="label" sx={{ display: 'none' }} aria-label="Browse files">
                  <input type="file" hidden />
                </Button>
                <Typography sx={{ color: '#B0B0B0', mt: 2, mb: 1 }}>OR</Typography>
                <TextField
                  onChange={(event) =>
                    setData((prevData) => ({
                      ...prevData,
                      link: event.target.value
                    }))
                  }
                  fullWidth
                  placeholder="Add link to your files"
                  size="small"
                  sx={{ mb: 2 }}
                />
              </Card>

              {/* Pricing Section */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                Set Pricing
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  // value={price}
                  onChange={(event) =>
                    setData((prevData) => ({
                      ...prevData,
                      price: event.target.value
                    }))
                  }
                  InputProps={{
                    startAdornment: <Typography sx={{ color: '#000', pr: 1 }}>₹</Typography>
                  }}
                  size="small"
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      borderColor: '#B0B0B0'
                    }
                  }}
                />
              </Box>

              <Box>
                <Box component="form" noValidate autoComplete="off">
                  {/* Page Title */}
                  <TextField
                    label="Page Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 75 }}
                    helperText="0/75"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        pageTitle: event.target.value
                      }))
                    }
                  />

                  {/* Category Dropdown */}
                  <TextField
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue="Finance"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        category: event.target.value
                      }))
                    }
                  >
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                  </TextField>

                  {/* Cover Image/Video */}
                  <Box border={1} borderColor="grey.400" borderRadius={1} p={2} textAlign="center" mt={2} mb={2}>
                    <IconButton color="primary" component="label">
                      <CloudUpload />
                      <input hidden accept="image/*,video/*" type="file" onChange={handleFileChange} />
                    </IconButton>
                    {/* <Typography></Typography> */}
                    <Typography variant="body2" color="textSecondary">
                      Browse files from your system
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      1280 x 720 (16:9) recommended
                    </Typography>
                  </Box>
                  {/* {preview && (
                    <div>
                      <h3>Uploaded Image:</h3>
                      <img src={preview} alt="Uploaded" style={{ maxWidth: '300px' }} />
                    </div>
                  )} */}

                  {/* Description */}
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        description: event.target.value
                      }))
                    }
                  />

                  {/* Button Text */}
                  <TextField
                    label="Button Text"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    defaultValue="Make Payment"
                    inputProps={{ maxLength: 15 }}
                    helperText="12/15"
                    onChange={(event) =>
                      setData((prevData) => ({
                        ...prevData,
                        buttonText: event.target.value
                      }))
                    }
                  />
                </Box>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#333333' },
                  height: 48,
                  borderRadius: 5
                }}
                onClick={handleSubmit}
              >
                Save and Continue
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ backgroundColor: 'lightblue', height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', px: 2 }}>
                <Grid container spacing={4} maxWidth="lg">
                  {/* Left Section */}
                  <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 4, borderRadius: 2 }}>
                     <Avatar sx={{ bgcolor: 'orange' }}>{selectedUserDetails?.name?.slice(0, 1)}</Avatar>
                      <Typography variant="body1" color="black">
                        {selectedUserDetails?.name || 'N/A'}
                      </Typography>
                      <Divider sx={{ my: 2 }} />

                      <Typography variant="h5" fontWeight="bold">
                        Title
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {data?.pageTitle?.slice(0, 50) || '-'}
                      </Typography>

                      <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                        Description
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {data?.description?.slice(0, 80) || '-'}
                      </Typography>

                      <Divider sx={{ my: 2 }} />
                      {preview && (
                        <Box sx={{ my: 2 }}>
                          <img src={preview} alt="Uploaded" style={{ maxWidth: '100%', borderRadius: 8, height: 150 }} />
                        </Box>
                        )}
                    </Paper>
                  </Grid>

                  {/* Right Section - Form */}
                  <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 4, borderRadius: 2 }} elevation={3}>
                      <div>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          Enter Your Details
                        </Typography>

                        {/* Name Field */}
                        <Stack spacing={1} mb={2}>
                          <InputLabel htmlFor="name">Name*</InputLabel>
                          <OutlinedInput id="name" name="name" placeholder="Enter your name" fullWidth />
                        </Stack>

                        {/* Email Field */}
                        <Stack spacing={1} mb={2}>
                          <InputLabel htmlFor="email">Email Address*</InputLabel>
                          <OutlinedInput id="email" name="email" placeholder="Enter your email" fullWidth />
                        </Stack>

                        {/* Phone Number Field */}
                        <Stack spacing={1} mb={2}>
                          <InputLabel htmlFor="phoneNumber">Phone Number*</InputLabel>
                          <OutlinedInput id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" fullWidth type="tel" />
                        </Stack>

                        {/* Payment Button */}
                        <Button variant="contained" color="success" fullWidth sx={{ mb: 2, py: 1.5 }}>
                          Payment Amount: ₹ {data?.price}
                        </Button>

                        {/* Submit Button */}
                        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ py: 1.5 }}>
                          {data?.buttonText}
                        </Button>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
    // <MainCard title="Sample Card">
    //   <Typography variant="body2">
    //     Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
    //     minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
    //     reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
    //     officiate descent molls anim id est labours.
    //   </Typography>
    // </MainCard>
  );
}
