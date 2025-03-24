import PropTypes from 'prop-types';
// material-ui
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';

// project import

const headCells = [
  {
    id: 'name',
    align: 'center',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'phoneNumber',
    align: 'center',
    disablePadding: true,
    label: 'Phone Number'
  },
  {
    id: 'email',
    align: 'center',
    disablePadding: false,
    label: 'Email'
  },
  {
    id: 'payementPageID',
    align: 'center',
    disablePadding: false,
    label: 'Payment Page Id'
  },
  {
    id: 'payementPageTitle',
    align: 'center',
    disablePadding: false,
    label: 'Payment page Title'
  },
  {
    id: 'totalPayment',
    align: 'center',
    disablePadding: false,
    label: 'Total Payment'
  },
  {
    id: 'status',
    align: 'center',
    disablePadding: false,
    label: 'Status'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ user, userPhoneNumber }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={userPhoneNumber === headCell.phoneNumber ? user : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function UserPaymentDetails(props) {
  const { userData } = props;
  const user = 'asc';
  const userPhoneNumber = 'phoneNumber';

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
          <OrderTableHead user={user} userPhoneNumber={userPhoneNumber} />
          <TableBody>
            {userData.map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={item.phoneNumber}
                >
                  <TableCell component="th" id={labelId} align="center" scope="row">
                    <Link color="secondary"> {item.name}</Link>
                  </TableCell>
                  <TableCell align="center">{item.phoneNumber}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item?.paymentDetails?._id}</TableCell>
                  <TableCell align="center">{item?.paymentDetails?.pageTitle}</TableCell>
                  <TableCell align="center">₹ {item?.paymentDetails?.price}</TableCell>
                  <TableCell align="center">Done</TableCell>
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
