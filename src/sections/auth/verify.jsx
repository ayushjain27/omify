// material-ui
import { Grid, Divider, Typography, Stack } from '@mui/material';

// project import
import AuthWrapper from './AuthWrapper';
import VerifyOtp from './verifyOtp';

// ================================|| REGISTER ||================================ //

export default function Verify() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Verify your Otp</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <VerifyOtp />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
