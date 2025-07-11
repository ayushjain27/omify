import { useState } from 'react';
import {
  DialogTitle,
  Card,
  IconButton,
  Typography,
  Box,
  Divider,
  Chip,
  Grid,
  Paper,
  Button,
  Modal,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserStatusApi } from '../../store/auth/authApi';

const statusColors = {
  ACTIVE: 'success',
  INACTIVE: 'error',
  REJECTED: 'warning'
};

const DialogData = ({ setPaymentDialog, setStatus }) => {
  const { paymentPageDetail } = useSelector(({ paymentPageReducer }) => paymentPageReducer);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(paymentPageDetail?.status || 'PENDING');
  const dispatch = useDispatch();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // const handleSubmitStatus = async () => {
  //   try {
  //     // Here you would typically dispatch an action to update the status
  //     // For example:
  //     const data = {
  //       userName: userData.userName,
  //       status: selectedStatus
  //     };
  //     await dispatch(updateUserStatusApi(data));

  //     console.log(`Updating status to: ${selectedStatus}`);
  //     setOpenStatusModal(false);
  //     setUserDialog(false);
  //     setStatus(true);
  //     // Optionally refresh user data or show success message
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          maxHeight: '100vh',
          overflow: 'auto',
          width: '100%',
          borderRadius: '12px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            zIndex: 1,
            py: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DialogTitle variant="h5" sx={{ p: 0, fontWeight: 600 }}>
              Payment Page Details
            </DialogTitle>
            {selectedUserDetails?.role === 'ADMIN' && (
              <Chip
                onClick={() => setOpenStatusModal(true)}
                sx={{ mx: 2, cursor: 'pointer' }}
                label="Update Status"
                color="primary"
                size="medium"
              />
            )}
          </Box>

          <IconButton
            onClick={() => setPaymentDialog(false)}
            aria-label="close"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {!paymentPageDetail ? (
          <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
            No payment data available
          </Typography>
        ) : (
          <>
            {/* Basic Details Section */}
            <Card sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Basic Details
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DetailRow label="Title" value={paymentPageDetail.pageTitle} />
                  <DetailRow label="Category" value={paymentPageDetail.category} />
                  <DetailRow label="Description" value={paymentPageDetail.description} />
                  <DetailRow label="Price" value={paymentPageDetail.price} />
                </Grid>
                <Grid item xs={6}>
                  <DetailRow
                    label="Status"
                    value={
                      <Chip
                        label={paymentPageDetail.status || 'N/A'}
                        color={statusColors[paymentPageDetail.status] || 'default'}
                        size="small"
                      />
                    }
                  />
                  <DetailRow label="Button Text" value={paymentPageDetail.buttonText} />
                  <DetailRow label="Social Media" value={`${paymentPageDetail.link}`} />
                  <DetailRow
                    label="Created At"
                    value={paymentPageDetail.createdAt ? new Date(paymentPageDetail.createdAt).toLocaleString() : 'N/A'}
                  />
                  <DetailRow
                    label="Updated At"
                    value={paymentPageDetail.updatedAt ? new Date(paymentPageDetail.updatedAt).toLocaleString() : 'N/A'}
                  />
                </Grid>
              </Grid>
            </Card>

            {/* Verification Images Section */}
            {/* <Card sx={{ p: 3, borderRadius: '8px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Verification Documents
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {userData?.panCardImage && (
                  <Grid item xs={6}>
                    <DocumentImage label="PAN Card" src={userData.panCardImage} />
                  </Grid>
                )}
                {userData?.cancelCheckImage && (
                  <Grid item xs={6}>
                    <DocumentImage label="Cancelled Check" src={userData.cancelCheckImage} />
                  </Grid>
                )}
              </Grid>
            </Card> */}
          </>
        )}
      </Paper>

      {/* Status Update Modal */}
      <Modal
        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        aria-labelledby="status-update-modal"
        aria-describedby="update-user-status"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Update User Status
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%', mb: 3 }}>
            <FormLabel component="legend">Select Status</FormLabel>
            <RadioGroup aria-label="status" name="status-radio-group" value={selectedStatus} onChange={handleStatusChange}>
              <FormControlLabel value="ACTIVE" control={<Radio />} label="Active" />
              <FormControlLabel value="INACTIVE" control={<Radio />} label="Inactive" />
              <FormControlLabel value="REJECTED" control={<Radio />} label="Rejected" />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => setOpenStatusModal(false)}>
              Cancel
            </Button>
            {/* <Button variant="contained" onClick={handleSubmitStatus} color="primary">
              Update Status
            </Button> */}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

// Reusable component for detail rows
const DetailRow = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
      {label}
    </Typography>
    <Typography variant="body1">{value || 'N/A'}</Typography>
  </Box>
);

// Reusable component for document images
const DocumentImage = ({ label, src }) => (
  <Box>
    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
      {label}
    </Typography>
    <Paper
      elevation={2}
      sx={{
        p: 1,
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          maxWidth: '100%',
          maxHeight: '250px',
          borderRadius: '4px',
          objectFit: 'contain'
        }}
      />
    </Paper>
  </Box>
);

export default DialogData;
