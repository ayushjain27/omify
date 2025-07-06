import { styled } from '@mui/material/styles';
import { 
  Box, 
  Card, 
  Container, 
  Typography, 
  Button, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Lock } from 'lucide-react';
import LoginForm from './LoginForm';
import loginImage from 'assets/images/users/image.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2)
}));

const AuthContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
}));

const AuthCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 1200,
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  borderRadius: theme.shape.borderRadius * 2,
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    maxWidth: 600
  }
}));

const ImageSection = styled('div')(({ theme }) => ({
  width: '45%',
  background: theme.palette.primary.main,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(5),
  color: theme.palette.common.white,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4),
    display: 'none' // Hide image section on mobile if desired
    // Alternatively, you can keep it with adjusted padding:
    // padding: theme.spacing(3)
  }
}));

const ContentSection = styled('div')(({ theme }) => ({
  width: '55%',
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3)
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

// ----------------------------------------------------------------------

export default function AuthLogin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <RootStyle>
      <AuthContainer maxWidth="lg">
        <AuthCard>
          {!isMobile && (
            <ImageSection>
              <Box sx={{ textAlign: 'center', mb: 5 }}>
                <Lock size={48} />
                <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
                  Welcome Back
                </Typography>
                <Typography variant="body1">
                  Enter your credentials to access your account and manage your dashboard.
                </Typography>
              </Box>
              <Box
                component="img"
                src={loginImage}
                alt="login"
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  borderRadius: 1
                }}
              />
            </ImageSection>
          )}

          <ContentSection>
            <Box sx={{ mb: 5, textAlign: isMobile ? 'center' : 'left' }}>
              <Lock size={48} sx={{ display: isMobile ? 'block' : 'none', margin: '0 auto 20px' }} />
              <Typography variant="h4" gutterBottom>
                Sign In to your Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your credentials
              </Typography>
            </Box>

            <LoginForm />
          </ContentSection>
        </AuthCard>
      </AuthContainer>
    </RootStyle>
  );
}