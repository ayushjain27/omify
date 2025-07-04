import { useEffect } from 'react';
import { DialogTitle, Card, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getPanCardImageApi } from '../../store/auth/authApi';

const DialogData = ({ setUserDialog, openUserDialog }) => {
  const { userData } = useSelector(({ authReducer }) => authReducer);

  console.log(userData, 'User Data');
  const dispatch = useDispatch();

  // Uncommented and updated useEffect
  useEffect(() => {
    // Add any side effects here
    const fetchData = async() => {
    const filename = userData.panCardImage.split('/').pop();
    await dispatch(getPanCardImageApi(filename));
    }
    fetchData();
  }, [openUserDialog, userData]);

  return (
    <Card sx={{ p: 2 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <DialogTitle variant="h3">User Details</DialogTitle>
        <IconButton onClick={() => setUserDialog(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Updated user details content */}
      <Card sx={{ p: 3, mt: 2 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Basic Details
        </Typography>
        {userData ? (
          <div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>User Name:</span>
              <span>{userData.userName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Email:</span>
              <span>{userData.email || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>PhoneNumber:</span>
              <span>{userData.phoneNumber || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Soical Link Type:</span>
              <span>{userData.socialLinkSelected || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Social Link:</span>
              <span>{userData.socialLink || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Status:</span>
              <span>{userData.status || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Created At:</span>
              <span>{userData.createdAt ? new Date(userData.createdAt).toLocaleString() : 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Updated At:</span>
              <span>{userData.updatedAt ? new Date(userData.updatedAt).toLocaleString() : 'N/A'}</span>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </Card>
      <Card sx={{ p: 3, mt: 2 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Verification Details
        </Typography>
        {userData ? (
          <div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Account Holder Name:</span>
              <span>{userData.accountHolderName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Account Number:</span>
              <span>{userData.accountNumber || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>AadharCard Number:</span>
              <span>{userData.aadharCardNumber || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Ifsc Code:</span>
              <span>{userData.ifscCode || 'N/A'}</span>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </Card>
    </Card>
  );
};

export default DialogData;
0;
