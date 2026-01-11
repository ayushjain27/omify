import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse, 
  Box,
  Badge,
  Chip
} from '@mui/material';
import { 
  ExpandLess, 
  ExpandMore,
  FiberManualRecord 
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const GroupHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const StyledListItem = styled(ListItem)(({ theme, active, level }) => ({
  borderRadius: '12px',
  margin: '6px 8px',
  padding: level > 1 ? '10px 16px 10px 32px' : '12px 16px',
  color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
  background: active 
    ? 'linear-gradient(90deg, rgba(96, 165, 250, 0.2) 0%, rgba(129, 140, 248, 0.2) 100%)'
    : 'transparent',
  border: active 
    ? '1px solid rgba(96, 165, 250, 0.3)'
    : '1px solid transparent',
  backdropFilter: active ? 'blur(10px)' : 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: 'linear-gradient(180deg, #60A5FA 0%, #818CF8 100%)',
    borderRadius: '4px 0 0 4px',
  } : {},
  
  '&:hover': {
    background: 'rgba(96, 165, 250, 0.1)',
    transform: 'translateX(4px)',
    borderColor: 'rgba(96, 165, 250, 0.2)',
    color: '#FFFFFF',
  },
  
  '& .MuiListItemIcon-root': {
    color: active ? '#60A5FA' : 'rgba(255, 255, 255, 0.6)',
    minWidth: '28px',
    fontSize: '1.25rem',
    transition: 'all 0.3s ease',
  },
  
  '& .MuiListItemText-primary': {
    fontWeight: active ? 600 : 500,
    fontSize: '0.875rem',
    letterSpacing: '0.3px',
  },
  
  '&:hover .MuiListItemIcon-root': {
    color: '#60A5FA',
    transform: 'scale(1.1)',
  }
}));

const SubMenuIndicator = styled(Box)(({ active }) => ({
  position: 'absolute',
  right: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: active 
    ? '#10B981'
    : 'rgba(255, 255, 255, 0.3)',
  boxShadow: active 
    ? '0 0 8px #10B981'
    : 'none',
}));

const NavGroup = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openItems, setOpenItems] = useState({});

  const handleItemClick = (child, hasChildren) => {
    if (hasChildren) {
      setOpenItems(prev => ({
        ...prev,
        [child.id]: !prev[child.id]
      }));
    } else {
      navigate(child.url);
    }
  };

  const hasChildren = (item) => {
    return item.children && item.children.some(child => child.type === 'item');
  };

  return (
    <Box sx={{ mb: 2 }}>
      <GroupHeader>
        {item.title}
        <FiberManualRecord sx={{ fontSize: '8px', color: 'rgba(96, 165, 250, 0.6)' }} />
      </GroupHeader>
      
      <List disablePadding>
        {item.children.map((child) => {
          const isActive = location.pathname === child.url;
          const hasSubItems = hasChildren(child);
          
          return (
            <React.Fragment key={child.id}>
              <StyledListItem
                active={isActive}
                level={1}
                onClick={() => handleItemClick(child, hasSubItems)}
                disablePadding
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <ListItemIcon>
                  {React.createElement(child.icon, {
                    style: {
                      fontSize: '1.1rem',
                    }
                  })}
                </ListItemIcon>
                
                <ListItemText 
                  primary={child.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }
                  }}
                />
                
                {hasSubItems ? (
                  <Box sx={{ ml: 1 }}>
                    {openItems[child.id] ? (
                      <ExpandLess sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)' }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.5)' }} />
                    )}
                  </Box>
                ) : (
                  <SubMenuIndicator active={isActive} />
                )}
                
                {child.badge && (
                  <Chip
                    label={child.badge}
                    size="small"
                    sx={{
                      ml: 1,
                      height: '20px',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      background: child.badgeColor || 'linear-gradient(90deg, #F59E0B, #F97316)',
                      color: '#FFFFFF',
                    }}
                  />
                )}
              </StyledListItem>
              
              {hasSubItems && child.children && (
                <Collapse in={openItems[child.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {child.children.map((subChild) => (
                      <StyledListItem
                        key={subChild.id}
                        active={location.pathname === subChild.url}
                        level={2}
                        onClick={() => navigate(subChild.url)}
                        disablePadding
                      >
                        <Box sx={{ width: '4px', mr: 2 }} />
                        <ListItemText 
                          primary={subChild.title}
                          sx={{ 
                            pl: 1,
                            '& .MuiListItemText-primary': {
                              fontSize: '0.8125rem',
                              fontWeight: 400,
                            }
                          }}
                        />
                        {subChild.new && (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              ml: 1,
                              height: '18px',
                              fontSize: '0.6rem',
                              background: '#10B981',
                              color: '#FFFFFF',
                            }}
                          />
                        )}
                      </StyledListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default NavGroup;