import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import ProtectedRoute from 'ProtectedRoute';
import { Navigate } from 'react-router';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const PaymentPage = Loadable(lazy(() => import('pages/extra-pages/payment-page')));
const TelegramPage = Loadable(lazy(() => import('pages/telegram/telegram-page')));
// const VerifyOtp = Loadable(lazy(() => import('pages/authentication/verifyOtp')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/dashboard/default" /> // Redirect root to dashboard/default
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: (
            <ProtectedRoute>
              <DashboardDefault />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: 'payment-page',
      element: (
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      )
    },
    {
      path: 'telegram-page',
      element: (
        <ProtectedRoute>
          <TelegramPage />
        </ProtectedRoute>
      )
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
