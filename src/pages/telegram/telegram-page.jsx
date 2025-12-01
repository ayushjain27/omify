/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import React, { useEffect, useState } from 'react';
import { Box, Card, Fade, Grid, Paper, Stack, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import AnalyticsEachNumberData from '../../components/Analytics/AnalyticsEachNumberData';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { useDispatch, useSelector } from 'react-redux';
import Scrollbar from '../../components/Scrollbar';
import ReactPaginate from 'react-paginate';
import { toUpper } from 'lodash';
import TelegramVerificationModal from './telegram-verification-modal';
import TelegramTable from './TelegramTable';
import { countAllTelegramPagesByUserNameApi, getTelegramPagePaginatedApi } from '../../store/telegram/telegramApi';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

// ==============================|| SAMPLE PAGE ||============================== //

export default function TelegramPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setValue] = useState('active');
  const [forcePage, setForcePage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const { countAllTelegramPage, isCountAllTelegramPageLoading, telegramList, isTelegramTablePaginatedLoading, telegramListPageSize } =
    useSelector(({ telegramReducer }) => telegramReducer);

  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleNavigation = () => {
    // Check if user is already verified with Telegram
    checkTelegramVerification();
  };

  const checkTelegramVerification = async () => {
    try {
      const response = await axios.get(`/api/telegram/groups/${selectedUserDetails?.id}`);
      if (response.data.success) {
        // User is already verified, navigate to create page
        navigate('/create-telegram-page');
      } else {
        // User needs to verify Telegram
        setShowVerificationModal(true);
      }
    } catch (error) {
      // Assume user needs verification if API fails
      setShowVerificationModal(true);
    }
  };

  const handleUpdateKyc = () => {
    navigate('/userProfile');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let fetchData = async () => {
      addStyles();
      await dispatch(countAllTelegramPagesByUserNameApi({ userName: selectedUserDetails?.userName }));
      await getAllTelegramPagePaginated();
    };
    fetchData();
  }, []);

  useEffect(() => {
    setItemOffset(0);
    setForcePage(0);
    getAllTelegramPagePaginated();
  }, [tabValue]);

  useEffect(() => {
    getAllTelegramPagePaginated();
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setItemOffset(newOffset);
    setForcePage(event.selected);
  };

  const getAllTelegramPagePaginated = async () => {
    const data = {
      pageNo: itemOffset,
      pageSize: telegramListPageSize,
      status: toUpper(tabValue),
      userName: selectedUserDetails?.userName
    };
    try {
      await dispatch(getTelegramPagePaginatedApi(data));
    } catch (error) {
      console.log(error);
    }
  };

  let length = 0;
  if (tabValue === 'active') {
    length = Math.ceil(countAllTelegramPage?.active / 50);
  } else if (tabValue === 'inActive') {
    length = Math.ceil(countAllTelegramPage?.inActive / 50);
  }
  const items = Array.from({ length }, (_, index) => index + 1);
  const pageCount = Math.ceil(items.length / 1);

  const addStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 10px 20px;
      }
      .page-item {
        margin: 0 5px;
      }
      .page-link {
        display: inline-block;
        padding: 4px 12px;
        color: #337ab7;
        text-decoration: none;
        border: 1px solid #ddd;
        border-radius: 50%;
        transition: background-color 0.3s ease;
      }
      .page-link:hover {
        background-color: #f5f5f5;
      }
      .active .page-link {
        background-color: lightgray;
        color: black;
      }
      .break-me {
        display: inline-block;
        color: #337ab7;
        text-decoration: none;
      }
      .page-item.previous .page-link,
      .page-item.next .page-link {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
      }
    `;
    document.head.appendChild(style);
  };

  const handleVerificationComplete = (groups) => {
    setShowVerificationModal(false);
    navigate('/create-telegram-page', { state: { channel: groups } });
  };

  const statCards = [
    {
      title: 'Total Telegram Pages',
      count: countAllTelegramPage?.total,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '📊'
    },
    {
      title: 'Active Pages',
      count: countAllTelegramPage?.active,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '✅'
    },
    {
      title: 'Inactive Pages',
      count: countAllTelegramPage?.inActive,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: '⏸️'
    },
    {
      title: 'Rejected Pages',
      count: countAllTelegramPage?.rejected || 0,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '❌'
    }
  ];

  return (
    <>
      <Box style={{ margin: '0px' }}>
        <Fade in timeout={500}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              color: 'white'
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
              <Box>
                <Typography variant="h4" fontWeight="700" gutterBottom>
                  Telegram Pages
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Manage and monitor all your Telegram pages
                </Typography>
              </Box>
              <AnimateButton>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  onClick={handleNavigation}
                  size={isMobile ? 'medium' : 'large'}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    fontWeight: 600,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.95)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Create Telegram Page
                </Button>
              </AnimateButton>
            </Stack>
          </Paper>
        </Fade>

        <TelegramVerificationModal
          open={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          onVerificationComplete={handleVerificationComplete}
        />

        <Grid container spacing={3} mb={3}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in timeout={500 + index * 100}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: card.gradient,
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1, fontWeight: 500 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h3" fontWeight="700">
                        {isCountAllTelegramPageLoading ? '...' : card.count || 0}
                      </Typography>
                    </Box>
                    <Box sx={{ fontSize: 48, opacity: 0.3 }}>{card.icon}</Box>
                  </Stack>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ marginTop: '16px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant={isDesktop ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
              sx={{
                '& .MuiTabs-flexContainer': {
                  flexWrap: 'wrap',
                  justifyContent: 'space-evenly'
                }
              }}
            >
              <Tab label="Active" icon={<InsertInvitationRoundedIcon />} iconPosition="start" value="active" />
              <Tab label="InActive" icon={<TodayRoundedIcon />} iconPosition="start" value="inActive" />
            </Tabs>
          </Box>
          <Scrollbar>
            <TelegramTable
              telegramList={telegramList}
              selectedTab={tabValue}
              isTelegramTablePaginatedLoading={isTelegramTablePaginatedLoading}
            />
          </Scrollbar>
        </Card>
        <Card sx={{ borderTopLeftRadius: '0px', borderTopRightRadius: '0px' }}>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            forcePage={forcePage} // Set the active page
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLinkClassName="page-link"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </Card>
      </Box>
    </>
  );
}