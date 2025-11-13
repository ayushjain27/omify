import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Paper, Avatar, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { useDispatch, useSelector } from 'react-redux';
import { countAllTelegramUsersByChannelIdApi, getAllTelegramUsersByChannelIdApi } from '../../store/telegram/telegramApi';
import { useLocation } from 'react-router-dom';
import Scrollbar from '../../components/Scrollbar';
import TelegramNewUserTable from './TelegramNewUserTable';
import { toUpper } from 'lodash';

const StatCard = ({ title, value, icon, bgColor }) => (
  <Card sx={{ height: '100%', background: bgColor, color: 'white' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default function TelegramPageUserDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down('sm'));
  const channelId = location.state?.telegramChannelId;
  const {
    countAllTelegramUsers,
    isTelegramNewUSerLoading,
    telegramNewUserList = [],
    telegramNewUserListPageSize
  } = useSelector(({ telegramReducer }) => telegramReducer);
  const [forcePage, setForcePage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [tabValue, setValue] = useState('ACTIVE');

  console.log(countAllTelegramUsers, 'countAllTelegramUsers', telegramNewUserList);

  useEffect(() => {
    let fetchData = async () => {
      addStyles();
      await dispatch(countAllTelegramUsersByChannelIdApi({ channelId }));
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
    console.log("aflnekjw")
    const data = {
      pageNo: itemOffset,
      pageSize: telegramNewUserListPageSize,
      status: toUpper(tabValue),
      channelId: channelId
    };
    console.log(data, 're3');
    try {
      await dispatch(getAllTelegramUsersByChannelIdApi(data));
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
  // // Filter users based on search query
  // const filteredUsers = userData.filter(
  //   (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.phoneNumber.includes(searchQuery)
  // );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Telegram Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={countAllTelegramUsers?.totalUsers || 0}
            icon={<PeopleIcon sx={{ fontSize: 32 }} />}
            bgColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={countAllTelegramUsers?.activeUsers || 0}
            icon={<CheckCircleIcon sx={{ fontSize: 32 }} />}
            bgColor="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inactive Users"
            value={countAllTelegramUsers?.inactiveUsers || 0}
            icon={<CancelIcon sx={{ fontSize: 32 }} />}
            bgColor="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Payments"
            // value={`₹${stats.totalPayments.toLocaleString()}`}
            value={`₹ 0`}
            icon={<AccountBalanceIcon sx={{ fontSize: 32 }} />}
            bgColor="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Grid>
      </Grid>

      {/* User Data Table */}
      {/* <Paper sx={{ p: 3, borderRadius: 2 }}> */}
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
            <Tab label="ACTIVE" icon={<InsertInvitationRoundedIcon />} iconPosition="start" value="active" />
            <Tab label="INACTIVE" icon={<TodayRoundedIcon />} iconPosition="start" value="inActive" />
          </Tabs>
        </Box>
        <Scrollbar>
          <TelegramNewUserTable
            telegramList={telegramNewUserList}
            selectedTab={tabValue}
            isTelegramTablePaginatedLoading={isTelegramNewUSerLoading}
          />
        </Scrollbar>
      </Card>
      {/* </Paper> */}
    </Box>
  );
}
