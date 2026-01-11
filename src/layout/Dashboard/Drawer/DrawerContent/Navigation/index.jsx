// material-ui
import { Box, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School'; // Course icon

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const NavigationWrapper = styled(Box)(({ theme }) => ({
  height: '100vh', // Full viewport height
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 100%)',
  position: 'fixed', // Fixed positioning
  left: 0,
  top: 0,
  width: '260px', // Fixed width for sidebar
  zIndex: 1200,
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  textAlign: 'center',
  flexShrink: 0, // Prevent shrinking
}));

const LogoText = styled('div')(({ theme }) => ({
  color: '#FFFFFF',
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '0.5px',
  background: 'linear-gradient(90deg, #60A5FA 0%, #818CF8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 10px rgba(96, 165, 250, 0.3)',
}));

const MenuSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
    }
  },
}));

const CourseSection = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(0, 2),
  flexShrink: 0, // Prevent shrinking
}));

const CourseButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.spacing(1),
  background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
  border: '1px solid rgba(96, 165, 250, 0.2)',
  color: '#E2E8F0',
  fontWeight: 600,
  fontSize: '0.95rem',
  textTransform: 'none',
  justifyContent: 'flex-start',
  gap: theme.spacing(1.5),
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, rgba(129, 140, 248, 0.2) 100%)',
    border: '1px solid rgba(96, 165, 250, 0.3)',
    boxShadow: '0 4px 12px rgba(96, 165, 250, 0.2)',
  },
}));

const LogoutSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(239, 68, 68, 0.05)',
  backdropFilter: 'blur(10px)',
  flexShrink: 0, // Prevent shrinking
  position: 'sticky',
  bottom: 0,
  left: 0,
  right: 0,
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  color: '#FCA5A5',
  fontWeight: 600,
  fontSize: '0.95rem',
  textTransform: 'none',
  justifyContent: 'flex-start',
  gap: theme.spacing(1.5),
  '&:hover': {
    background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '0.75rem',
  flexShrink: 0, // Prevent shrinking
  background: 'rgba(15, 23, 42, 0.8)',
  backdropFilter: 'blur(10px)',
}));

export default function Navigation() {
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return null;
    }
  });

  const handleCourseClick = () => {
    // Add your course navigation logic here
    console.log('Course button clicked');
    // Example: navigate('/courses');
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
    // Example: logout function or navigate to logout
  };

  return (
    <NavigationWrapper>
      <LogoSection>
        <LogoText>OMIFY</LogoText>
        <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            bgcolor: '#10B981',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { opacity: 1 },
              '50%': { opacity: 0.5 },
              '100%': { opacity: 1 }
            }
          }} />
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            bgcolor: '#F59E0B',
            animation: 'pulse 2s infinite 0.3s',
          }} />
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%', 
            bgcolor: '#EF4444',
            animation: 'pulse 2s infinite 0.6s',
          }} />
        </Stack>
      </LogoSection>
      
      <MenuSection>
        {navGroups}
        
        {/* Course Tab Section - Added after main navigation */}
        <CourseSection>
          <CourseButton 
            startIcon={<SchoolIcon sx={{ color: '#60A5FA' }} />}
            onClick={handleCourseClick}
          >
            Courses
          </CourseButton>
        </CourseSection>
      </MenuSection>
      
      {/* Fixed Logout Button - Added at the bottom */}
      <LogoutSection>
        <LogoutButton 
          startIcon={<LogoutIcon sx={{ color: '#FCA5A5' }} />}
          onClick={handleLogout}
        >
          Logout
        </LogoutButton>
      </LogoutSection>
      
      <FooterSection>
        <Box textAlign="center">
          <Box sx={{ 
            mb: 1,
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            v2.1.0 • Premium Edition
          </Box>
          <Box sx={{ 
            width: '100%', 
            height: 4, 
            borderRadius: 2,
            background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)',
            animation: 'gradientSlide 3s ease infinite',
            '@keyframes gradientSlide': {
              '0%': { backgroundPosition: '0% 50%' },
              '50%': { backgroundPosition: '100% 50%' },
              '100%': { backgroundPosition: '0% 50%' }
            },
            backgroundSize: '200% 200%'
          }} />
          <Box sx={{ 
            mt: 1,
            fontSize: '0.65rem',
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '0.3px'
          }}>
            © 2024 SYSTEM PRO
          </Box>
        </Box>
      </FooterSection>
    </NavigationWrapper>
  );
}