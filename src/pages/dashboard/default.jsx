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
import UserTable from '../dashboard/UserTable';
import ReactPaginate from 'react-paginate';
import { toUpper } from 'lodash';
import { getAllUserCountsApi, getAllUserDataApi } from '../../store/auth/authApi';
import { countAllUsersDataByUserNameApi, getAllUsersDataByUserNameApi } from '../../store/payment-page/paymentPageApi';
import UserDataTable from './UserDataTable';

// ==============================|| SAMPLE PAGE ||============================== //

export default function DashboardDefault() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setValue] = useState('active');
  const [forcePage, setForcePage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { selectedUserDetails, allUsersCount, isCountUserLoading, allUserData, isUserDataLoading, userPageSize } = useSelector(
    ({ authReducer }) => authReducer
  );
  const { isCountAllUserDataLoading, countAllUserData, userDataList, isUserDataPaginatedLoading, userDataListPageSize } = useSelector(
    ({ paymentPageReducer }) => paymentPageReducer
  );
  const [status, setStatus] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let fetchData = async () => {
      addStyles();
      if (selectedUserDetails?.role === 'ADMIN') {
        await dispatch(getAllUserCountsApi());
        await getAllUserDetailsPaginated();
      } else {
        await dispatch(countAllUsersDataByUserNameApi({ userName: selectedUserDetails?.userName }));
        await getAllUserDataPaginated();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let fetchData = async () => {
      if (selectedUserDetails?.role === 'ADMIN') {
        await dispatch(getAllUserCountsApi());
        await getAllUserDetailsPaginated();
        setStatus(false);
      }
    };
    if (status) {
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    setItemOffset(0);
    setForcePage(0);
    if (selectedUserDetails?.role === 'ADMIN') {
      getAllUserDetailsPaginated();
    }
  }, [tabValue]);

  useEffect(() => {
    if (selectedUserDetails?.role === 'ADMIN') {
      getAllUserDetailsPaginated();
    } else {
      getAllUserDataPaginated();
    }
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setItemOffset(newOffset);
    setForcePage(event.selected);
  };

  const getAllUserDetailsPaginated = async () => {
    const data = {
      pageNo: itemOffset,
      pageSize: userPageSize,
      status: toUpper(tabValue)
    };
    try {
      await dispatch(getAllUserDataApi(data));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserDataPaginated = async () => {
    const data = {
      pageNo: itemOffset,
      pageSize: userDataListPageSize,
      userName: selectedUserDetails?.userName
    };
    try {
      await dispatch(getAllUsersDataByUserNameApi(data));
    } catch (error) {
      console.log(error);
    }
  };

  let length = 0;
  if (tabValue === 'active') {
    length = Math.ceil(allUsersCount?.active / 50);
  } else if (tabValue === 'inActive') {
    length = Math.ceil(allUsersCount?.inActive / 50);
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

  return (
    <>
      <div style={{ margin: '0px' }}>
        {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <AnimateButton>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" onClick={handleUpdateKyc}>
              Update Kyc
            </Button>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" onClick={handleNavigation}>
              Create Payment Page
            </Button>
          </AnimateButton>
        </div> */}
        {selectedUserDetails?.role === 'ADMIN' ? (
          <Grid container rowSpacing={4.5} columnSpacing={2.75} mt={1}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AnalyticsEachNumberData
                title="Total Users Pages"
                number={allUsersCount?.total}
                loading={isCountUserLoading}
                sx={{ backgroundColor: '#74CAFF' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AnalyticsEachNumberData
                title="Total Active Users"
                number={allUsersCount?.active}
                loading={isCountUserLoading}
                sx={{ backgroundColor: '#5BE584' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AnalyticsEachNumberData
                title="Total In-Active Users"
                number={allUsersCount?.inActive}
                loading={isCountUserLoading}
                sx={{ backgroundColor: '#ffe704' }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <AnalyticsEachNumberData
                title="Total Rejected Users"
                number={allUsersCount?.rejected}
                loading={isCountUserLoading}
                sx={{ backgroundColor: '#ffe704' }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container rowSpacing={4.5} columnSpacing={2.75} mt={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <AnalyticsEachNumberData
                title="Total Users"
                number={countAllUserData?.total}
                loading={isCountAllUserDataLoading}
                sx={{ backgroundColor: '#74CAFF' }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3}>
            <AnalyticsEachNumberData
              title="Total Active Users"
              number={allUsersCount?.active}
              loading={isCountUserLoading}
              sx={{ backgroundColor: '#5BE584' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <AnalyticsEachNumberData
              title="Total In-Active Users"
              number={allUsersCount?.inActive}
              loading={isCountUserLoading}
              sx={{ backgroundColor: '#ffe704' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <AnalyticsEachNumberData
              title="Total Rejected Users"
              number={allUsersCount?.rejected}
              loading={isCountUserLoading}
              sx={{ backgroundColor: '#ffe704' }}
            />
          </Grid> */}
          </Grid>
        )}
        <Card sx={{ marginTop: '16px' }}>
          {selectedUserDetails?.role === 'ADMIN' ? (
            <>
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
                  <Tab label="Rejected" icon={<TodayRoundedIcon />} iconPosition="start" value="rejected" />
                </Tabs>
              </Box>
              <Scrollbar>
                <UserTable allUserData={allUserData} selectedTab={tabValue} isUserDataLoading={isUserDataLoading} setStatus={setStatus} />
              </Scrollbar>
            </>
          ) : (
            <Scrollbar>
              <UserDataTable userDataList={userDataList} isUserDataPaginatedLoading={isUserDataPaginatedLoading} />
            </Scrollbar>
          )}
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
