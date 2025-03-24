import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

// ================================|| LOGIN ||================================ //

export default function MainDashboardSection() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ backgroundColor: '#fce4ec', padding: '2rem' }}>
        {/* Header Section */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
            {/* cosmo<span style={{ color: '#ff4081' }}>feed</span> */}
            Omify
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ff4081',
              color: '#fff',
              '&:hover': { backgroundColor: '#ff79b0' }
            }}
            onClick={() => navigate('/login')}
          >
            Create Payment Page
          </Button>
        </Grid>

        {/* Content Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Left Side Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
              Create a custom payment page in less than a minute!
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Monetize your content in a few clicks. Create a no-code payment link to receive payments instantly by sharing it with your
              customers.
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#333', color: '#fff' }} onClick={() => navigate('/login')}>
              Get started
            </Button>
          </Grid>

          {/* Right Side Image */}
          <Grid item xs={12} md={6} mt={4}>
            <Card
              sx={{
                maxWidth: 300,
                mx: 'auto',
                boxShadow: 4
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image="https://via.placeholder.com/300" // Replace with your actual image URL
                alt="Payment Page"
              />
            </Card>
          </Grid>
        </Grid>

        {/* Statistics Section */}
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                p: 2,
                borderRadius: 1,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6">₹3,20,456</Typography>
              <Typography variant="body2">Payment Page Earning</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box
              sx={{
                backgroundColor: '#f50057',
                color: '#fff',
                p: 2,
                borderRadius: 1,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6">₹1,00,000</Typography>
              <Typography variant="body2">Withdrawn Already</Typography>
            </Box>
          </Grid>
        </Grid>
        {/* Add any additional sections as needed */}
      </Box>
      {/* Features Section */}
      <Box sx={{ backgroundColor: '#fff', py: 6, px: 6 }}>
        {/* Section Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4,
            color: '#333'
          }}
        >
          Power-packed custom payment pages you need today
        </Typography>

        {/* Feature Cards */}
        <Grid container spacing={4} justifyContent="center">
          {/* Feature 1: No-Code Link */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: '#e3f2fd',
                boxShadow: 3,
                textAlign: 'center',
                p: 3,
                borderRadius: '16px'
              }}
            >
              <CardMedia
                component="img"
                alt="No-Code Link"
                image="https://via.placeholder.com/300" // Replace with actual image
                sx={{ maxHeight: '200px', margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  No-Code Link
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                  Go online and start collecting payments instantly with no tech integrations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2: Smart Tracking */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: '#e3f2fd',
                boxShadow: 3,
                textAlign: 'center',
                p: 3,
                borderRadius: '16px'
              }}
            >
              <CardMedia
                component="img"
                alt="Smart Tracking"
                image="https://via.placeholder.com/300" // Replace with actual image
                sx={{ maxHeight: '200px', margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Smart Tracking
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                  Track and analyze all your payments at a single platform.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3: Easy Withdrawals */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: '#e3f2fd',
                boxShadow: 3,
                textAlign: 'center',
                p: 3,
                borderRadius: '16px'
              }}
            >
              <CardMedia
                component="img"
                alt="Easy Withdrawals"
                image="https://via.placeholder.com/300" // Replace with actual image
                sx={{ maxHeight: '200px', margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Easy Withdrawals
                </Typography>
                <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                  Withdraw your money hassle-free as and when you need.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Get Started Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#555' }
            }}
            onClick={() => navigate('/login')}
          >
            Get started
          </Button>
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#f5f5f5',
          color: '#333',
          py: 4,
          px: { xs: 2, md: 12 },
          mt: 6
        }}
      >
        <Grid container spacing={4}>
          {/* Left Section - Logo and Description */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: '#000'
              }}
            >
              Omify
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
              Omify empowers digital entrepreneurs across India to build, manage, and monetise their online business.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Guaranteed safe and secure payments.
            </Typography>
            {/* Payment Icons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <img src="https://via.placeholder.com/32" alt="Payment Icon 1" style={{ width: 32, height: 32 }} />
              <img src="https://via.placeholder.com/32" alt="Payment Icon 2" style={{ width: 32, height: 32 }} />
              <img src="https://via.placeholder.com/32" alt="Payment Icon 3" style={{ width: 32, height: 32 }} />
              <img src="https://via.placeholder.com/32" alt="Payment Icon 4" style={{ width: 32, height: 32 }} />
            </Box>
          </Grid>

          {/* Middle Section - Links */}

          {/* Right Section - About and Policies */}
          <Grid item xs={12} sm={6} md={6}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textTransform: 'uppercase',
                color: '#000'
              }}
            >
              About
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemText primary="Terms" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Privacy" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemText primary="Refund and Cancellation" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 4,
            pt: 2,
            borderTop: '1px solid #ddd'
          }}
        >
          <Typography variant="body2" sx={{ color: '#555' }}>
            © 2025 Omify Pvt Ltd
          </Typography>
        </Box>
      </Box>
    </>
  );
}
