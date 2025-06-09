import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
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
  Typography,
  Autocomplete
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataByUserNameApi, sendOtpApi, updateUserProfileByUserNameApi, verifyOtpApi } from '../../store/auth/authApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth } from '../../context/AuthContext';
import { nameSalOpts, socialLinkOpts } from '../../utils/constant';

// import { LoadingButton } from '@mui/lab';
//
// import { MIconButton } from '../../components/@extended/MIconButton';

// ----------------------------------------------------------------------

export default function UserProfileForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [socialLinkVisible, setSocialLinkVisible] = useState(true);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const { setIsAuthenticated, setCheckUserProfile } = useAuth();

  const UserProfileSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    phoneNumber: Yup.string().required('Please enter a phone number').length(10, 'Please enter 10 digit mobile number'),
    socialLinkSelected: Yup.string().required('Please select social link'),
    socialLink: Yup.string().required('Please enter a social link'),
    nameSalutation: Yup.string().required('Please select a salutation')
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      socialLinkSelected: '',
      socialLink: '',
      nameSalutation: ''
    },
    validationSchema: UserProfileSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        setLoading(true);
        const params = {
          userName: selectedUserDetails?.userName,
          name: values.name,
          phoneNumber: values.phoneNumber,
          socialLinkSelected: values.socialLinkSelected,
          socialLink: values.socialLink,
          nameSalutation: values.nameSalutation
        };
        let response = await dispatch(updateUserProfileByUserNameApi(params));
        response = unwrapResult(response);
        if (response?.message === 'No User Exists') {
          enqueueSnackbar('No User Exists', {
            variant: 'error'
          });
          setLoading(false);
        }
        enqueueSnackbar('Congratulations!, User Profile has updated', {
          variant: 'success'
        });
        setLoading(false);
        setIsAuthenticated(true);
        setCheckUserProfile(false);
        navigate('/dashboard/default');
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({
          afterSubmit: error?.message || 'Something went wrong. Please check your credentials and try again.'
        });
        // }
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <Autocomplete
              name="nameSalutation"
              options={nameSalOpts}
              filterSelectedOptions
              value={values.nameSalutation}
              isOptionEqualToValue={(option, value) => option?.label === value?.label}
              onChange={(event, newValue) => formik.setFieldValue('nameSalutation', newValue?.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Select Salutation*"
                  error={touched.nameSalutation && errors.nameSalutation}
                  helperText={touched.nameSalutation && errors.nameSalutation}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>{option.label}</Typography>
                  </Stack>
                </li>
              )}
            />
            <TextField
              fullWidth
              autoComplete="name"
              label="Enter Name"
              {...getFieldProps('name')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('name', _.toUpper(value));
              }}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              type="number"
              autoComplete="phoneNumber"
              label="Enter PhoneNumber"
              {...getFieldProps('phoneNumber')}
              onChange={({ target: { value } }) => {
                // Only allow numbers and limit to 10 digits
                const numericValue = value.replace(/\D/g, '').slice(0, 10);
                formik.setFieldValue('phoneNumber', numericValue);
              }}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
            <Autocomplete
              name="socialLinkSelected"
              options={socialLinkOpts}
              filterSelectedOptions
              value={values.socialLinkSelected}
              isOptionEqualToValue={(option, value) => option?.label === value?.label}
              onChange={(event, newValue) => {
                formik.setFieldValue('socialLinkSelected', newValue?.value);
                setSocialLinkVisible(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Select Social Links *"
                  error={touched.socialLinkSelected && errors.socialLinkSelected}
                  helperText={touched.socialLinkSelected && errors.socialLinkSelected}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>{option.label}</Typography>
                  </Stack>
                </li>
              )}
            />
            <TextField
              fullWidth
              autoComplete="socialLink"
              disabled={socialLinkVisible}
              // type="number"
              label="Enter Social Link"
              {...getFieldProps('socialLink')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('socialLink', value);
              }}
              error={Boolean(touched.socialLink && errors.socialLink)}
              helperText={touched.socialLink && errors.socialLink}
            />
          </Stack>

          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <FormControlLabel control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />} label="Remember me" /> */}
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.forgotPassword}>
                Forgot password
              </Link>{' '}
              <span style={{ margin: '0 5px' }}>|</span>
              <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.sellerRegisteration}>
                Partner Register
              </Link>
            </Stack> */}
          {/* </Stack> */}
          <LoadingButton variant="contained" type="submit" sx={{ mt: 4, width: '100%' }} color="success" loading={loading}>
            {loading ? 'Submitting in...' : 'Submit'}
          </LoadingButton>
          {/* <Typography>{`v ${window?.env?.VERSION_NAME}(${window?.env?.VERSION_CODE})`}</Typography> */}
        </Form>
      </FormikProvider>
    </>
  );
}
