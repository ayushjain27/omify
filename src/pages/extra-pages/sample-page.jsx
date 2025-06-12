// material-ui
import React, { useState } from 'react';
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
  Divider,
  Stack,
  InputLabel,
  OutlinedInput,
  Avatar
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import TableChartIcon from '@mui/icons-material/TableChart';
import axios from 'axios';
import { useNavigate } from 'react-router';

// project imports
import { useSelector } from 'react-redux';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [priceType, setPriceType] = useState('fixed');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [anyFile, setAnyFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [anyPreview, setAnyPreview] = useState(null);
  const [fileType, setFileType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState('');

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
  };

  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

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
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split('.').pop().toLowerCase();
    const fileType = selectedFile.type;

    // Validate file type
    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'mp4', 'jpg', 'jpeg', 'png'];
    if (!allowedExtensions.includes(fileExt)) {
      alert('Please upload only PDF, Excel, Word, MP4, JPG, or PNG files');
      return;
    }
    setAnyFile(selectedFile);
    setFileType(fileExt);
    console.log(selectedFile, 'Demkrf');

    // handleUpload(file);

    // Create a preview
    if (fileType.startsWith('image/') || fileExt === 'mp4') {
      const previewUrl = URL.createObjectURL(selectedFile);
      setAnyPreview(previewUrl);
    } else {
      // For documents, use icon preview
      setAnyPreview(null);
    }

    alert('File Added');
  };

  const renderPreview = () => {
    console.log("msdkek")
    if (!anyFile) return null;

    switch (fileType) {
      case 'jpg':
      case 'jpeg':
      case 'png':
        return (
          <div>
            <Typography variant="h6">Uploaded Image:</Typography>
            <img src={anyPreview} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        );
      case 'mp4':
        return (
          <div>
            <Typography variant="h6">Uploaded Video:</Typography>
            <video controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
              <source src={anyPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'pdf':
        return (
          <div>
            <Typography variant="h6">Uploaded PDF:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <PictureAsPdfIcon color="error" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      case 'doc':
      case 'docx':
        return (
          <div>
            <Typography variant="h6">Uploaded Word Document:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <DescriptionIcon color="primary" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      case 'xls':
      case 'xlsx':
        return (
          <div>
            <Typography variant="h6">Uploaded Excel File:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                p: 2,
                border: '1px dashed #ccc',
                borderRadius: 1
              }}
            >
              <TableChartIcon color="success" sx={{ fontSize: 60 }} />
              <Typography>{anyFile.name}</Typography>
            </Box>
          </div>
        );
      default:
        return null;
    }
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
      <Box
        sx={{
          height: '100vh',
          overflow: 'hidden', // Prevent scrolling
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Grid
          container
          spacing={2}
          sx={{
            flex: 1, // Takes remaining space
            overflow: 'hidden' // Prevent scrolling
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: '100%',
              overflow: 'auto', // Enable scrolling only inside this column
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              pb: 2 // Add some padding at bottom
            }}
          >
            <Box sx={{ backgroundColor: 'white', p: 2 }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Create Payment Page
              </Typography>
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
                  borderColor: '#E0E0E0'
                }}
              >
                <IconButton color="primary" component="label">
                  <CloudUpload />
                  <input hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.mp4,.jpg,.jpeg,.png" type="file" onChange={handleAnyfileChange} />
                </IconButton>
                <Typography variant="body1" sx={{ color: '#E91E63', fontWeight: 'bold', mb: 1 }}>
                  Upload files from your system
                </Typography>
                <Button component="label" sx={{ display: 'none' }} aria-label="Browse files">
                  <input type="file" hidden />
                </Button>
              </Card>
              {renderPreview()}
              <TextField
                label="Page Title"
                placeholder="Add Title"
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                helperText={data?.pageTitle?.length > 0 ? `${data?.pageTitle?.length}/50` : `0/50`}
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    pageTitle: event.target.value
                  }))
                }
              />
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
                sx={{ mt: 0 }}
              />
              <TextField
                onChange={(event) =>
                  setData((prevData) => ({
                    ...prevData,
                    link: event.target.value
                  }))
                }
                label="Add YouTube/Google Drive Link"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Add link to your files"
                sx={{ mt: 0 }}
              />

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
                    sx={{ mt: 0 }}
                  >
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Education">Education</MenuItem>
                  </TextField>

                  {/* Cover Image/Video */}
                  <Box border={1} borderColor="grey.400" borderRadius={1} p={2} textAlign="center" mt={2} mb={2}>
                    <IconButton color="primary" component="label">
                      <CloudUpload />
                      <input hidden accept=".jpg,.jpeg,.png" type="file" onChange={handleFileChange} />
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
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#333333' },
                  height: 48,
                  borderRadius: 2
                }}
                onClick={handleSubmit}
              >
                Save and Continue
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              height: '100%',
              overflow: 'auto', // Enable scrolling only inside this column
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <Box sx={{ backgroundColor: 'lightblue' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', pt: 3, pl: 3 }}>
                Preview
              </Typography>
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
