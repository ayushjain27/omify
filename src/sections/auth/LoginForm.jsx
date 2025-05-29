import * as Yup from 'yup';
import { useEffect, useState } from 'react';
// import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import closeFill from '@iconify/icons-eva/close-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  MenuItem,
  Typography
} from '@mui/material';

// import { LoadingButton } from '@mui/lab';
//
// import { MIconButton } from '../../components/@extended/MIconButton';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    // password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      employeeId: '',
      password: ''
      // remember: true,
      // role: 'oem'
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // const user = await login(values.userName, values.password);
        // if (user?.role === 'EMPLOYEE') {
        //   const params = {};
        //   params.employeeId = user?.employeeId;
        //   params.userName = user?.oemId;
        //   let res = await dispatch(getEmployeeByEmployeeIdApi(params));
        //   res = unwrapResult(res);
        //   const reqBody = { ...res };
        //   const date = new Date();
        //   reqBody.loginDate = date;
        //   await dispatch(updateSPEmployeeApi(reqBody));
        // } else if (user?.role !== 'EMPLOYEE') {
        //   const params = {};
        //   params.userName = values.userName;
        //   let res = await dispatch(getUserByUserNameApi(params));
        //   res = unwrapResult(res);
        //   const reqBody = { ...res };
        //   const date = new Date();
        //   reqBody.loginDate = date;
        //   await dispatch(updateAdminApi(reqBody));
        // }

        // const storeStartTime = async () => {
        //   try {
        //     const startTime = new Date();
        //     await localStorage.setItem('AppStartTime', startTime.toISOString()); // Serialize Date to ISO string
        //     await dispatch(
        //       createPartnerUsersApi({
        //         module: 'SCREEN_MODE',
        //         event: 'ONLINE',
        //         message: 'Screen Monitor',
        //         startTime: startTime.toISOString(),
        //         moduleInformation: user?.userId,
        //         // endTime: 'Fri Jul 05 2024 14:23:59 GMT+0530',
        //         // totalTimeDuration: 200,
        //         platform: 'ADMIN_PAGE',
        //         phoneNumber: user?.contactInfo?.phoneNumber?.primary || ''
        //       })
        //     );
        //     console.log('App start time stored:', startTime);
        //   } catch (error) {
        //     console.error('Error saving start time:', error);
        //   }
        // };

        // if (user?.role === 'OEM') {
        //   storeStartTime();
        // }

        // eslint-disable-next-line no-debugger
        // enqueueSnackbar('Login success', {
        //   variant: 'success',
        //   action: (key) => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   )
        // });
        setSubmitting(false);
        // if (user.isFirstTimeLoggedIn) {
        //   navigate(PATH_AUTH.updatePasword, { replace: true });
        // }
      } catch (error) {
        console.error(error);
        // resetForm();
        // if (isMountedRef.current) {
        setSubmitting(false);
        setErrors({
          afterSubmit: error?.message || 'Something went wrong. Please check your credentials and try again.'
        });
        // }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            <TextField
              fullWidth
              autoComplete="email"
              // type="number"
              label="Email"
              {...getFieldProps('email')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('email', _.toLower(value));
              }}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <IconButton onClick={handleShowPassword} edge="end">
              //         <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              //       </IconButton>
              //     </InputAdornment>
              //   )
              // }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            />
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgotPassword}>
                Forgot password
              </Link>{' '}
              <span style={{ margin: '0 5px' }}>|</span>
              <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.sellerRegisteration}>
                Partner Register
              </Link>
            </Stack> */}
          </Stack>
          {/* <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButton> */}
          {/* <Typography>{`v ${window?.env?.VERSION_NAME}(${window?.env?.VERSION_CODE})`}</Typography> */}
        </Form>
      </FormikProvider>
    </>
  );
}
