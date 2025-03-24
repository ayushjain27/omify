import { lazy } from 'react';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';
import { element } from 'prop-types';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/auth/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/auth/Register')));
const VerifyOtp = Loadable(lazy(() => import('../sections/auth/verify')));
const MainDashboardSection = Loadable(lazy(() => import('../sections/auth/MainDashboardSection')));
const ContentPage = Loadable(lazy(() => import('pages/extra-pages/content-page')));

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/verify',
      element: <VerifyOtp />
    },
    {
      path: '/mainDashboardSection',
      element: <MainDashboardSection />
    },
    {
      path: '/contentPage',
      element: <ContentPage />
    }
  ]
};

export default LoginRoutes;
