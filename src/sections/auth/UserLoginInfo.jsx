import { Box, Card, Stack, Container, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from './LoginForm';
import UserProfileImage from 'assets/images/users/userLoginProfile.png';
import UserProfileForm from './UserProfileForm';

const SectionStyle = styled(Card)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  maxWidth: '45%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #3a4ba3 0%, #25316D 100%)',
  borderRadius: 0,
  boxShadow: theme.shadows[10],
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '100%',
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: theme.spacing(4)
  }
}));

const FloatingIllustration = styled('img')(({ theme }) => ({
  width: '80%',
  maxWidth: 500,
  filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))',
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0px)' }
  }
}));

export default function UserLoginProfile() {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column'
      }
    }}>
      {/* Left Section - Illustration */}
      <SectionStyle>
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          px: 5,
          mb: 10
        }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 'bold',
            mb: 2,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Welcome Back!
          </Typography>
          <Typography variant="h5" sx={{ 
            opacity: 0.9,
            mb: 5,
            textShadow: '0 1px 5px rgba(0,0,0,0.1)'
          }}>
            Complete your profile to get started
          </Typography>
        </Box>
        <FloatingIllustration src={UserProfileImage} alt="login" />
      </SectionStyle>

      {/* Right Section - Form */}
      <Container maxWidth="sm" sx={{ 
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
          padding: 0
        }
      }}>
        <ContentStyle>
          <Box sx={{ 
            mb: 5,
            textAlign: { xs: 'center', md: 'left' }
          }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: theme.palette.text.primary
            }}>
              Complete Your Profile
            </Typography>
            <Typography variant="body1" sx={{ 
              color: theme.palette.text.secondary,
              fontSize: '1.1rem'
            }}>
              Please enter your details to continue
            </Typography>
          </Box>

          {/* Profile Form */}
          <Card sx={{
            p: 4,
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid',
            borderColor: theme.palette.divider
          }}>
            <UserProfileForm />
          </Card>
        </ContentStyle>
      </Container>
    </Box>
  );
}