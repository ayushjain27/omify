// material-ui
import {
  Grid,
  Stack,
  Typography,
  Avatar,
  AvatarGroup,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Box
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import UserTable from './UserTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserPaymentDetails from './UserPaymentDetails';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
// import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { getAllUserDataApi } from '../../store/auth/authApi';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [userData, setUserData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { selectedUserDetails  } = useSelector(({ authReducer }) => authReducer);
  const { setIsAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
         let token = await localStorage.getItem('accessToken');
         if(!token){
          setIsAuthenticated(false);
         }
        setPhoneNumber(phoneNumber);
        const response = await axios.get(
          selectedUserDetails?.role === 'ADMIN'
            ? dispatch(getAllUserDataApi()) : '' 
          //   : 'http://localhost:12000/userPaymentDetails/getAllPaymentUserDetails',
          // { params: { phoneNumber: phoneNumber } }
        );

        // // Check if the request was successful
        // if (response.status === 200) {
        //   console.log('API request successful:', response.data);
        //   setUserData(response.data); // Assuming 'setUserData' is defined to set the user data in state
        // } else {
        //   console.error('API request failed with status:', response.status);
        // }
      } catch (error) {
        console.error('Error during API request:', error.message);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

  const [totalAmount, setTotalAmount] = useState(null);
  const [totalNewUser, setTotalNewUser] = useState(null);
  useEffect(() => {
    if (phoneNumber !== '+917838245184') {
      const totalPrice = userData.reduce((sum, item) => sum + Number(item.paymentDetails.price), 0);
      setTotalAmount(totalPrice);
      const uniqueEmails = new Set(userData.map((user) => user.email));
      // console.log(uniqueEmails, 'fmrmk');
      setTotalNewUser(uniqueEmails?.size);
    }
  }, [userData]);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce
          title="Total New Users"
          count={phoneNumber === '+917838245184' ? '18,800' : `${totalNewUser}`}
          percentage={70.5}
          extra="8,900"
        />
      </Grid>
      {selectedUserDetails?.role === 'ADMIN' && (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count={String(userData?.length)} percentage={70.5} extra="8,900" />
      </Grid>
      )}
      {selectedUserDetails?.role !== 'ADMIN' && (
        <>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Payment Pages"
              count={selectedUserDetails?.role === 'ADMIN' ? '18,800' : `₹ ${totalAmount}`}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Payment Received"
              count={selectedUserDetails?.role === 'ADMIN' ? '18,800' : `₹ ${totalAmount}`}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce
              title="Total Payment Pending"
              count={selectedUserDetails?.role === 'ADMIN' ? '18,800' : `₹ ${totalAmount}`}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
        </>
      )}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Users Data</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {selectedUserDetails?.role === 'ADMIN' ? <UserTable /> : <UserPaymentDetails userData={userData} />}
        </MainCard>
      </Grid>
    </Grid>
  );
}
