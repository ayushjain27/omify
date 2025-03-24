// material-ui
import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MainCard from 'components/MainCard';
import PaymentTable from 'pages/dashboard/PaymentTable';
import AnimateButton from 'components/@extended/AnimateButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

export default function PaymentPage() {
  const navigate = useNavigate();
  let phoneNumber = localStorage.getItem('omifyUserPhoneNumber');

  const handleNavigation = () => {
    navigate('/createPayment');
  };

  const [paymentList, setPaymentList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let phoneNumber = await localStorage.getItem('omifyUserPhoneNumber');
        console.log(phoneNumber, 'delmfk');
        const response = await axios.get( phoneNumber === '+917838245184' ? 'https://omify-backend.vercel.app/paymentPage/getAllPaymentPages' : 'https://omify-backend.vercel.app/paymentPage/getPaymentDetailsListByPhoneNumber', {
          params: { phoneNumber: phoneNumber } // Pass phoneNumber in the `params` field
        });

        // Check if the request was successful
        if (response.status === 200) {
          console.log('API request successful:', response.data);
          setPaymentList(response.data); // Assuming 'setPaymentList' is defined to set the user data in state
        } else {
          console.error('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during API request:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ margin: phoneNumber === '9999999999' ? '0px' : '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <AnimateButton>
            <Button fullWidth size="large" type="submit" variant="contained" color="primary" onClick={handleNavigation}>
              Create Payment Page
            </Button>
          </AnimateButton>
        </div>
        <Grid container rowSpacing={4.5} columnSpacing={2.75} mt={1}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce
              title="Total Payment Pages Created"
              count={paymentList.length}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce
              title="Total Active Pages"
              count={paymentList.filter((item) => item.status === 'ACTIVE').length}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <AnalyticEcommerce
              title="Total InActive Pages"
              count={paymentList.filter((item) => item.status === 'INACTIVE').length}
              percentage={27.4}
              isLoss
              color="warning"
              extra="1,943"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnalyticEcommerce title="Total Payment Pages" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
          </Grid> */}
        </Grid>
        <Grid item xs={12} mt={2}>
          <Grid container alignItems="center" justifyContent="space-between">
            {/* <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid> */}
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <PaymentTable paymentList={paymentList} />
          </MainCard>
        </Grid>
      </div>
    </>
  );
}
