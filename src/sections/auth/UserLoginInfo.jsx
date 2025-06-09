// import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Tooltip, Container, Typography } from '@mui/material';
import LoginForm from './LoginForm';
import UserProfileImage from 'assets/images/users/userLoginProfile.png';
import UserProfileForm from './UserProfileForm';
// import { MHidden } from '../../components/@extended/MHidden';
// import Page from '../Page';

// ----------------------------------------------------------------------

// const RootStyle = styled(Page)(({ theme }) => ({
//   [theme.breakpoints.up('md')]: {
//     display: 'flex'
//   }
// }));


const SectionStyle = styled(Card)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  maxWidth: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
  // margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '50%',
  width: '100%',
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  // padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function UserLoginProfile() {
  return (
    <>
     {/* <RootStyle title="Login | Serviceplug"> */}
     {/* <MHidden width="mdDown"> */}
     <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
      <SectionStyle>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, User
        </Typography>
        <img src={UserProfileImage} alt="login" style={{ width: '80%' }} />
      </SectionStyle>
      {/* </MHidden> */}

      <Container>
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h2" gutterBottom>
                Complete your profile
              </Typography>
              <Typography variant="h5"  sx={{ color: 'text.secondary' }}>Enter your details.</Typography>
            </Box>

            {/* <Tooltip title={method}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip> */}
          </Stack>
          <UserProfileForm />
        </ContentStyle>
      </Container>
      </Box>
      {/* </RootStyle> */}
    </>
  );
}
