/* eslint-disable react/jsx-key */
import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// project import
import Dot from 'components/@extended/Dot';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ hasActive }) {
  const dynamicHeadCells = [
    {
      id: 'pageTitle',
      align: 'center',
      disablePadding: false,
      label: 'Page Title'
    },
    {
      id: 'category',
      align: 'center',
      disablePadding: true,
      label: 'Category'
    },
    {
      id: 'description',
      align: 'center',
      disablePadding: false,
      label: 'Description'
    },
    {
      id: 'price',
      align: 'center',
      disablePadding: false,
      label: 'Total Amount'
    },
    {
      id: 'status',
      align: 'center',
      disablePadding: false,
      label: 'Status'
    }
  ];

  // Conditionally add the Share Icon column
  if (hasActive) {
    dynamicHeadCells.push({
      id: 'share',
      align: 'center',
      disablePadding: false,
      label: 'Share'
    });
  }

  return (
    <TableHead>
      <TableRow>
        {dynamicHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

const handleUpateStatus = async (paymentId) => {
  // Use the phoneNumber parameter directly
  console.log('Payment Id:', paymentId);
  let phoneNumber = await localStorage.getItem('omifyUserPhoneNumber');
  console.log(phoneNumber, 'phoneNumber');
  if (phoneNumber === '+917838245184') {
    const response = await axios.post('https://omify-backend.vercel.app/paymentPage/updatePaymentStatus', { paymentId: paymentId });
  } else {
    alert('Product is in review. Please wait until it is active');
  }
  // Add your logic here
};

function UserStatus({ status, paymentId }) {
  let color;
  let title;

  switch (status) {
    case 'INACTIVE':
      color = 'error';
      title = 'INACTIVE';
      break;
    case 'ACTIVE':
      color = 'success';
      title = 'ACTIVE';
      break;
    // case 2:
    //   color = 'error';
    //   title = 'Rejected';
    //   break;
    // default:
    //   color = 'primary';
    //   title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
      <Dot color={color} />
      <Button onClick={() => handleUpateStatus(paymentId)} color={color}>
        {title}
      </Button>
    </Stack>
  );
}

export default function PaymentTable(props) {
  const { paymentList } = props;

  const handleCopyLink = (id) => {
    console.log(id, 'dmrkfmk');
    const link = `https://omify-backend.vercel.app/omify/contentPage?id=${encodeURIComponent(id)}`;
    console.log(link, 'dmrkmf');
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Link copied to clipboard: ' + link);
      })
      .catch((err) => {
        console.error('Failed to copy link: ', err);
      });
  };

  const hasActive = paymentList.some((item) => item.status === 'ACTIVE');

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          maxHeight: '60vh',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead hasActive={hasActive} />
          <TableBody>
            {paymentList.map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  // key={}
                >
                  <TableCell component="th" align="center" id={labelId} scope="row">
                    {item.pageTitle}
                  </TableCell>
                  <TableCell align="center">{item.category}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                  <TableCell align="center">₹ {item.price}</TableCell>
                  <TableCell align="center">
                    <UserStatus status={item.status} paymentId={item?._id} />
                  </TableCell>
                  {item?.status && (
                    <TableCell align="center">
                      {item.status === 'ACTIVE' && (
                        <IconButton onClick={() => handleCopyLink(item._id)}>
                          <ContentCopyIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };
