import { useEffect } from 'react';
import { DialogTitle, Card, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';

const DialogData = ({ setUserDialog, openUserDialog }) => {
  const { userData } = useSelector(({ authReducer }) => authReducer);

  console.log(userData, "User Data");

  // Uncommented and updated useEffect
  useEffect(() => {
    // Add any side effects here
  }, [openUserDialog, userData]);

  return (
    <Card sx={{ p: 2 }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <DialogTitle variant="h3">User Details</DialogTitle>
        <IconButton onClick={() => setUserDialog(false)} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Updated user details content */}
      <div style={{ marginTop: '16px' }}>
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
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Status:</span>
              <span>{userData.status || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Created At:</span>
              <span>
                {userData.createdAt ? new Date(userData.createdAt).toLocaleString() : 'N/A'}
              </span>
            </div>
            <div style={{ display: 'flex', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, opacity: 0.4, width: '150px' }}>Updated At:</span>
              <span>
                {userData.updatedAt ? new Date(userData.updatedAt).toLocaleString() : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </Card>
  );
};

export default DialogData;0