import { RouterProvider } from 'react-router-dom';

// Project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from 'context/AuthContext'; // Import AuthProvider
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store/store';
import LoadingScreen from './components/LoadingScreen';
import NotistackProvider from './components/NotistackProvider';

export default function App() {
  return (
    <ThemeCustomization>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <NotistackProvider>
            <AuthProvider>
              <ScrollTop>
                <RouterProvider router={router} />
              </ScrollTop>
            </AuthProvider>
          </NotistackProvider>
        </PersistGate>
      </ReduxProvider>
    </ThemeCustomization>
  );
}
