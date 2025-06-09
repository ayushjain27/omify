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
import Box from '@mui/material/Box';

// project import
import Dot from 'components/@extended/Dot';
import { Button } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

const handleUpateStatus = async (phoneNumber) => {
  // Use the phoneNumber parameter directly
  console.log('Phone Number:', phoneNumber);
  const response = await axios.post('http://localhost:12000/auth/updateUserStatus', { phoneNumber: phoneNumber });
  console.log(response, 'response');
  // Add your logic here
};

function UserStatus({ status, phoneNumber }) {
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
      <Button onClick={() => handleUpateStatus(phoneNumber)} color={color} >
        {title}
      </Button>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function UserTable(props) {
  const { allUserData  } = useSelector(({ authReducer }) => authReducer);
  const user = 'asc';
  const userPhoneNumber = 'phoneNumber';

  console.log(allUserData,"allUserData")

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
            {allUserData.map((item, index) => {
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
                  {/* <TableCell align="center">{item.status}</TableCell> */}
                  <TableCell align="center">
                    <UserStatus status={item.status} phoneNumber={item?.phoneNumber} />
                  </TableCell>
                  {/* <TableCell align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
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

UserStatus.propTypes = { status: PropTypes.number };
