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
  Radio,
  Stack,
  Avatar,
  Fade,
  Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionIcon from '@mui/icons-material/Description';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import { useDispatch, useSelector } from 'react-redux';

const statusColors = {
  ACTIVE: { color: 'success', bg: '#d4edda', text: '#155724' },
  INACTIVE: { color: 'warning', bg: '#fff3cd', text: '#856404' },
  REJECTED: { color: 'error', bg: '#f8d7da', text: '#721c24' }
};

const TelegramDialogData = ({ setTelegramDialog, setStatus }) => {
  const { telegramPageDetail } = useSelector(({ telegramReducer }) => telegramReducer);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(telegramPageDetail?.status || 'INACTIVE');
  const dispatch = useDispatch();
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmitStatus = async () => {
    try {
      const data = {
        telegramId: telegramPageDetail?._id,
        status: selectedStatus
      };
      // await dispatch(updateTelegramStatusApi(data));
      setOpenStatusModal(false);
      setTelegramDialog(false);
      setStatus(true);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          p: { xs: 2, md: 4 }
        }}
      >
        <Fade in timeout={500}>
          <Paper
            elevation={0}
            sx={{
              maxWidth: 1200,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: 'linear-gradient(135deg, #0088cc 0%, #00aced 100%)',
                p: 3,
                color: 'white'
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: 'white',
                      color: '#0088cc',
                      width: 56,
                      height: 56
                    }}
                  >
                    <PeopleIcon fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="700">
                      Telegram Channel Details
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                      View and manage Telegram channel information
                    </Typography>
                  </Box>
                </Stack>
                <IconButton
                  onClick={() => setTelegramDialog(false)}
                  sx={{
                    color: 'white',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.3)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
            </Box>

            {!telegramPageDetail ? (
              <Box sx={{ p: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No Telegram data available
                </Typography>
              </Box>
            ) : (
              <Box sx={{ p: 4 }}>
                {/* Status and Action Section */}
                <Grid container spacing={3} mb={4}>
                  <Grid item xs={12}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: statusColors[telegramPageDetail.status]?.bg || 'grey.100',
                        border: '2px solid',
                        borderColor: statusColors[telegramPageDetail.status]?.text || 'grey.300',
                        borderRadius: 2
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="h6" fontWeight={600} color="text.primary">
                            Current Status:
                          </Typography>
                          <Chip
                            label={telegramPageDetail.status || 'N/A'}
                            color={statusColors[telegramPageDetail.status]?.color || 'default'}
                            size="medium"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              px: 2,
                              py: 2.5
                            }}
                          />
                        </Stack>
                        {selectedUserDetails?.role === 'ADMIN' && (
                          <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setOpenStatusModal(true)}
                            sx={{
                              borderRadius: 2,
                              px: 3,
                              py: 1.5,
                              fontWeight: 600,
                              boxShadow: 3,
                              bgcolor: '#0088cc',
                              '&:hover': { bgcolor: '#006699' }
                            }}
                          >
                            Update Status
                          </Button>
                        )}
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>

                {/* Basic Details Section */}
                <Card
                  elevation={0}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ p: 3, bgcolor: 'primary.lighter' }}>
                    <Typography variant="h6" fontWeight={700} color="primary.main">
                      📢 Channel Information
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<PeopleIcon color="primary" />}
                          label="Channel Name"
                          value={telegramPageDetail.channelName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<DescriptionIcon color="primary" />}
                          label="Title"
                          value={telegramPageDetail.title}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<PersonIcon color="primary" />}
                          label="Username"
                          value={telegramPageDetail.userName}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<CategoryIcon color="primary" />}
                          label="Category"
                          value={telegramPageDetail.category}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InfoCard
                          icon={<DescriptionIcon color="secondary" />}
                          label="Description"
                          value={telegramPageDetail.description}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<SmartphoneIcon color="action" />}
                          label="Phone Number"
                          value={telegramPageDetail.phoneNumber}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<LinkIcon color="info" />}
                          label="Button Text"
                          value={telegramPageDetail.buttonText}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<CalendarTodayIcon color="action" />}
                          label="Created At"
                          value={telegramPageDetail.createdAt ? new Date(telegramPageDetail.createdAt).toLocaleString() : 'N/A'}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<CalendarTodayIcon color="action" />}
                          label="Updated At"
                          value={telegramPageDetail.updatedAt ? new Date(telegramPageDetail.updatedAt).toLocaleString() : 'N/A'}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Card>

                {/* Channel Link & ID Section */}
                <Card
                  elevation={0}
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box sx={{ p: 3, bgcolor: 'secondary.lighter' }}>
                    <Typography variant="h6" fontWeight={700} color="secondary.main">
                      🔗 Channel Links & IDs
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<LinkIcon color="primary" />}
                          label="Channel Link"
                          value={telegramPageDetail.channelLink}
                          isLink={true}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InfoCard
                          icon={<PeopleIcon color="primary" />}
                          label="Channel ID"
                          value={telegramPageDetail.channelId}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Card>

                {/* Plans Section */}
                {telegramPageDetail?.plans && telegramPageDetail.plans.length > 0 && (
                  <Card
                    elevation={0}
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ p: 3, bgcolor: 'success.lighter' }}>
                      <Typography variant="h6" fontWeight={700} color="success.main">
                        💰 Subscription Plans
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={2}>
                        {telegramPageDetail.plans.map((plan, index) => (
                          <Grid item xs={12} md={6} key={index}>
                            <Card
                              elevation={0}
                              sx={{
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                bgcolor: 'background.paper'
                              }}
                            >
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  Plan {index + 1}
                                </Typography>
                                {Object.entries(plan).map(([key, value]) => (
                                  <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="caption" color="text.secondary">
                                      {key}:
                                    </Typography>
                                    <Typography variant="body2" fontWeight={500}>
                                      {String(value)}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Card>
                )}

                {/* Image Section */}
                {telegramPageDetail?.imageUrl && (
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Box sx={{ p: 3, bgcolor: 'warning.lighter' }}>
                      <Typography variant="h6" fontWeight={700} color="warning.main">
                        🖼️ Channel Image
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <DocumentCard label="Channel Thumbnail" src={telegramPageDetail.imageUrl} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                )}
              </Box>
            )}
          </Paper>
        </Fade>
      </Box>

      {/* Status Update Modal */}
      <Modal
        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: { backdropFilter: 'blur(4px)' }
          }
        }}
      >
        <Fade in={openStatusModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '90%', sm: 500 },
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #0088cc 0%, #00aced 100%)',
                color: 'white'
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Update Telegram Channel Status
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Select a new status for this Telegram channel
              </Typography>
            </Box>

            <Box sx={{ p: 3 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2
                  }}
                >
                  Status Options
                </FormLabel>
                <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
                  <Card
                    elevation={0}
                    sx={{
                      mb: 2,
                      border: '2px solid',
                      borderColor: selectedStatus === 'ACTIVE' ? 'success.main' : 'divider',
                      bgcolor: selectedStatus === 'ACTIVE' ? 'success.lighter' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FormControlLabel
                      value="ACTIVE"
                      control={<Radio />}
                      label={
                        <Box sx={{ py: 1 }}>
                          <Typography fontWeight={600}>Active</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Channel is live and accessible
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0, p: 2 }}
                    />
                  </Card>
                  <Card
                    elevation={0}
                    sx={{
                      mb: 2,
                      border: '2px solid',
                      borderColor: selectedStatus === 'INACTIVE' ? 'warning.main' : 'divider',
                      bgcolor: selectedStatus === 'INACTIVE' ? 'warning.lighter' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FormControlLabel
                      value="INACTIVE"
                      control={<Radio />}
                      label={
                        <Box sx={{ py: 1 }}>
                          <Typography fontWeight={600}>Inactive</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Channel is temporarily disabled
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0, p: 2 }}
                    />
                  </Card>
                  <Card
                    elevation={0}
                    sx={{
                      border: '2px solid',
                      borderColor: selectedStatus === 'REJECTED' ? 'error.main' : 'divider',
                      bgcolor: selectedStatus === 'REJECTED' ? 'error.lighter' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <FormControlLabel
                      value="REJECTED"
                      control={<Radio />}
                      label={
                        <Box sx={{ py: 1 }}>
                          <Typography fontWeight={600}>Rejected</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Channel has been declined
                          </Typography>
                        </Box>
                      }
                      sx={{ width: '100%', m: 0, p: 2 }}
                    />
                  </Card>
                </RadioGroup>
              </FormControl>

              <Stack direction="row" spacing={2} mt={4}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setOpenStatusModal(false)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSubmitStatus}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: 3,
                    bgcolor: '#0088cc',
                    '&:hover': { bgcolor: '#006699' }
                  }}
                >
                  Update Status
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

// Info Card Component
const InfoCard = ({ icon, label, value, isLink = false }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      height: '100%',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transform: 'translateY(-2px)'
      }
    }}
  >
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box sx={{ mt: 0.5 }}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
          {label}
        </Typography>
        {isLink ? (
          <Typography
            component="a"
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            variant="body1"
            fontWeight={500}
            sx={{
              wordBreak: 'break-word',
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {value || 'N/A'}
          </Typography>
        ) : (
          <Typography variant="body1" fontWeight={500} sx={{ wordBreak: 'break-word' }}>
            {value || 'N/A'}
          </Typography>
        )}
      </Box>
    </Stack>
  </Paper>
);

// Document Card Component
const DocumentCard = ({ label, src }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 2,
      border: '2px dashed',
      borderColor: 'divider',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#0088cc',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
      }
    }}
  >
    <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
      <Typography variant="subtitle2" fontWeight={700}>
        {label}
      </Typography>
    </Box>
    <Box
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'white',
        minHeight: 200
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          maxWidth: '100%',
          maxHeight: '300px',
          borderRadius: '8px',
          objectFit: 'contain'
        }}
      />
    </Box>
  </Paper>
);

export default TelegramDialogData;