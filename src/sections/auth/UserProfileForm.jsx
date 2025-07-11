import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { useFormik, Form, FormikProvider } from 'formik';
import { Box, Stack, Alert, TextField, Typography, Autocomplete, Card, Paper, InputAdornment, IconButton, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileByUserNameApi } from '../../store/auth/authApi';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth } from '../../context/AuthContext';
import { nameSalOpts, socialLinkOpts } from '../../utils/constant';
import { CheckCircleOutline, Person, Phone, Link as LinkIcon } from '@mui/icons-material';

export default function UserProfileForm() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [socialLinkVisible, setSocialLinkVisible] = useState(true);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const { setIsAuthenticated, setCheckUserProfile } = useAuth();

  const UserProfileSchema = Yup.object().shape({
    name: Yup.string().required('Please enter a name'),
    phoneNumber: Yup.string().required('Please enter a phone number').length(10, 'Please enter 10 digit mobile number'),
    socialLinkSelected: Yup.string().required('Please select social link'),
    socialLink: Yup.string().required('Please enter a social link')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      socialLinkSelected: '',
      socialLink: ''
    },
    validationSchema: UserProfileSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setLoading(true);
        const params = {
          userName: selectedUserDetails?.userName,
          name: values.name,
          phoneNumber: values.phoneNumber,
          socialLinkSelected: values.socialLinkSelected,
          socialLink: values.socialLink
        };
        let response = await dispatch(updateUserProfileByUserNameApi(params));
        response = unwrapResult(response);
        if (response?.message === 'No User Exists') {
          enqueueSnackbar('No User Exists', { variant: 'error' });
          setLoading(false);
          return;
        }
        enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
        setLoading(false);
        setIsAuthenticated(true);
        setCheckUserProfile(false);
        navigate('/dashboard/default');
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({
          afterSubmit: error?.message || 'Something went wrong. Please try again.'
        });
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <Card
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: '0 16px 32px rgba(0,0,0,0.08)',
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: theme.palette.text.primary
        }}
      >
        Complete Your Profile
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary
        }}
      >
        Please fill in your details to continue
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && (
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {errors.afterSubmit}
              </Alert>
            )}

            <TextField
              fullWidth
              autoComplete="name"
              label="Full Name"
              {...getFieldProps('name')}
              onChange={({ target: { value } }) => {
                formik.setFieldValue('name', _.toUpper(value));
              }}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider
                  }
                }
              }}
            />

            <TextField
              fullWidth
              type="number"
              autoComplete="phoneNumber"
              label="Phone Number"
              {...getFieldProps('phoneNumber')}
              onChange={({ target: { value } }) => {
                const numericValue = value.replace(/\D/g, '').slice(0, 10);
                formik.setFieldValue('phoneNumber', numericValue);
              }}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider
                  }
                }
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
                  label="Select Social Media Platform"
                  error={touched.socialLinkSelected && errors.socialLinkSelected}
                  helperText={touched.socialLinkSelected && errors.socialLinkSelected}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <LinkIcon color="action" />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: theme.palette.divider
                      }
                    }
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography>{option.label}</Typography>
                  </Stack>
                </li>
              )}
              sx={{
                '& .MuiAutocomplete-popupIndicator': {
                  transform: 'none'
                }
              }}
            />

            {!socialLinkVisible && (
              <TextField
                fullWidth
                autoComplete="socialLink"
                label="Social Media Profile URL"
                {...getFieldProps('socialLink')}
                onChange={({ target: { value } }) => {
                  formik.setFieldValue('socialLink', value);
                }}
                error={Boolean(touched.socialLink && errors.socialLink)}
                helperText={touched.socialLink && errors.socialLink}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LinkIcon color="action" />
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: theme.palette.divider
                    }
                  }
                }}
              />
            )}

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              loadingPosition="start"
              startIcon={!loading && <CheckCircleOutline />}
              sx={{
                mt: 3,
                py: 2,
                borderRadius: 2,
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                },
                transition: 'all 0.3s'
              }}
            >
              {loading ? 'Updating Profile...' : 'Complete Profile'}
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
