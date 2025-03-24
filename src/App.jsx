import { RouterProvider } from 'react-router-dom';

// Project imports
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from 'context/AuthContext'; // Import AuthProvider

export default function App() {
  return (
    <ThemeCustomization>
      <AuthProvider>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </AuthProvider>
    </ThemeCustomization>
  );
}
