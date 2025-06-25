import { lazy } from 'react';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';
import { element } from 'prop-types';

// render - login
const AuthLogin = Loadable(lazy(() => import('../sections/auth/AuthLogin')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/Register')));
const VerifyOtp = Loadable(lazy(() => import('../sections/auth/verify')));
const MainDashboardSection = Loadable(lazy(() => import('../sections/auth/MainDashboardSection')));
const UserProfile = Loadable(lazy(() => import('../sections/auth/UserProfile')));
const UserLoginProfile = Loadable(lazy(() => import('../sections/auth/UserLoginInfo')));
const ContentPage = Loadable(lazy(() => import('pages/extra-pages/content-page')));
const PaymentList = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const CreateTelegramPage = Loadable(lazy(() => import('pages/telegram/create-telegram-page')));

// jwt auth
// const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
// const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

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
      path: '/userProfile',
      element: <UserProfile />
    },
    {
      path: '/userLoginProfile',
      element: <UserLoginProfile />
    },
    {
      path: 'createPayment',
      element: <PaymentList />
    },
    {
      path: '/contentPage',
      element: <ContentPage />
    },
    {
      path: 'create-telegram-page',
      element: <CreateTelegramPage />
    }
  ]
};

export default LoginRoutes;
