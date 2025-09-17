/* eslint-disable react-hooks/exhaustive-deps */
// material-ui
import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
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

// ==============================|| SAMPLE PAGE ||============================== //

export default function TelegramPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
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
    navigate('/create-telegram-page', { state: { channel: groups } }); // Note: channel is inside an object
    // navigate('/create-telegram-page');
  };

  return (
    <>
      <div style={{ margin: '0px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <AnimateButton>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" onClick={handleNavigation}>
              Create Telegram Page
            </Button>
          </AnimateButton>
        </div>
        <TelegramVerificationModal
          open={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          onVerificationComplete={handleVerificationComplete}
        />
        <Grid container rowSpacing={4.5} columnSpacing={2.75} mt={1}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <AnalyticsEachNumberData
              title="Total Telegram Pages"
              number={countAllTelegramPage?.total}
              loading={isCountAllTelegramPageLoading}
              sx={{ backgroundColor: '#74CAFF' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <AnalyticsEachNumberData
              title="Total Active Telegram Pages"
              number={countAllTelegramPage?.active}
              loading={isCountAllTelegramPageLoading}
              sx={{ backgroundColor: '#5BE584' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <AnalyticsEachNumberData
              title="Total In-Active Telegram Pages"
              number={countAllTelegramPage?.inActive}
              loading={isCountAllTelegramPageLoading}
              sx={{ backgroundColor: '#ffe704' }}
            />
          </Grid>
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
      </div>
    </>
  );
}
