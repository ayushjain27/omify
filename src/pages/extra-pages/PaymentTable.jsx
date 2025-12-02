import React, { useCallback, useEffect, useState } from 'react';
import { 
  Box, 
  Chip, 
  Dialog, 
  IconButton, 
  Tooltip,
  Typography,
  Paper,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CustomLoadingCellRenderer } from '../../utils/constant';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment';
import { getPaymentPageDetailByIdApi } from '../../store/payment-page/paymentPageApi';
import DialogData from './DialogData';
import { useNavigate } from 'react-router';

ModuleRegistry.registerModules([AllCommunityModule]);

const StyledGridContainer = styled(Box)(({ theme }) => ({
  height: '65vh',
  width: '100%',
  '& .ag-theme-alpine': {
    borderRadius: '12px',
    border: 'none',
    overflow: 'hidden',
    '& .ag-header': {
      backgroundColor: theme.palette.background.paper,
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
    '& .ag-header-cell': {
      padding: '16px 8px',
      fontWeight: '600',
      fontSize: '14px',
      color: theme.palette.text.primary,
    },
    '& .ag-row': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      }
    },
    '& .ag-cell': {
      padding: '12px 8px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px'
    }
  }
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: '600',
  textTransform: 'capitalize',
  ...(status === 'ACTIVE' && {
    backgroundColor: '#e8f5e8',
    color: '#2e7d32'
  }),
  ...(status === 'INACTIVE' && {
    backgroundColor: '#fff3e0',
    color: '#f57c00'
  }),
  ...(status === 'REJECTED' && {
    backgroundColor: '#ffebee',
    color: '#d32f2f'
  })
}));

const ImageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',
  height: '50px',
  borderRadius: '8px',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

const createRowData = (data, callBackFns) => {
  return {
    id: data?._id,
    image: data?.imageUrl,
    title: data?.pageTitle,
    description: data?.description,
    price: `₹${data?.price}`,
    status: data?.status,
    accountNumber: data?.accountNumber,
    createdAt: moment(data?.createdAt).format('DD MMM YYYY, hh:mm A'),
    userId: data?.userName,
    ...callBackFns
  };
};

export default function PaymentTable(props) {
  const { paymentList = [], selectedTab, isPaymentTablePaginatedLoading, setStatus } = props;
  const [gridApi, setGridApi] = useState(null);
  const [openPaymentDialog, setPaymentDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const { selectedUserDetails } = useSelector(({ authReducer }) => authReducer);
  const navigate = useNavigate();

  const columns = [
    {
      field: 'image',
      headerName: 'Image',
      filter: 'agTextColumnFilter',
      minWidth: 80,
      maxWidth: 80,
      cellRenderer: ({ data }) => renderProductImage(data)
    },
    {
      field: 'title',
      headerName: 'Title',
      filter: 'agTextColumnFilter',
      minWidth: 180,
      cellRenderer: ({ data }) => renderTitleWithView(data)
    },
    {
      field: 'description',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
      minWidth: 200,
      cellRenderer: ({ data }) => (
        <Tooltip title={data.description || 'No description'}>
          <Typography variant="body2" noWrap sx={{ maxWidth: '200px' }}>
            {data.description || 'No description'}
          </Typography>
        </Tooltip>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      maxWidth: 120,
      cellRenderer: ({ data }) => (
        <Typography variant="body2" fontWeight="600" color="primary.main">
          {data.price}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      maxWidth: 120,
      cellRenderer: ({ data }) => (
        <StatusChip 
          label={data.status?.toLowerCase() || 'Unknown'} 
          status={data.status}
          size="small"
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      filter: 'agDateColumnFilter',
      minWidth: 180,
      maxWidth: 180
    },
    {
      field: 'action',
      headerName: 'Actions',
      sortable: false,
      minWidth: 120,
      maxWidth: 120,
      cellRenderer: ({ data }) => renderActionButtons(data)
    }
  ];

  useEffect(() => {
    if (!_.isEmpty(paymentList)) {
      const rowD = _.map(paymentList, (data) => createRowData(data, { showPaymentDetails, copyLink }));
      setRowData(rowD || []);
    } else {
      setRowData([]);
    }
  }, [selectedTab, paymentList]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const renderProductImage = (data) => (
    <ImageContainer>
      <img
        src={data?.image || '/assets/images/placeholder-image.jpg'}
        alt="Product"
        onError={(e) => {
          e.target.src = '/assets/images/placeholder-image.jpg';
        }}
      />
    </ImageContainer>
  );

  const renderTitleWithView = (data) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" fontWeight="500" noWrap sx={{ maxWidth: '150px' }}>
        {data.title}
      </Typography>
      <Tooltip title="View Details">
        <IconButton 
          size="small" 
          onClick={() => showPaymentDetails(data)}
          sx={{ 
            color: 'primary.main',
            '&:hover': { backgroundColor: 'primary.light', color: 'white' }
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderActionButtons = (data) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="Copy Payment Link">
        <IconButton
          size="small"
          onClick={() => {
            copyLink(data);
          }}
          sx={{ 
            backgroundColor: 'primary.light',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.main' }
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const showPaymentDetails = async (data) => {
    await dispatch(getPaymentPageDetailByIdApi({ id: data?.id }));
    setPaymentDialog(true);
  };

  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);

  useEffect(() => {
    if (!gridApi) return;
    if (isPaymentTablePaginatedLoading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [isPaymentTablePaginatedLoading, gridApi]);

  const copyLink = (data) => {
    if (!selectedUserDetails?.adhaarCardNumber && selectedUserDetails?.role === 'USER') {
      enqueueSnackbar('Please update your KYC details', { variant: 'success' });
      navigate('/userProfile', { replace: true });
    } else {
      // const linkToCopy = `https://omify.vercel.app/contentPage?id=${data?.id || 'dmkemkd'}`;
      const linkToCopy = `http://localhost:3000/contentPage?id=${data?.id || 'dmkemkd'}`;
      navigator.clipboard.writeText(linkToCopy)
        .then(() => {
          enqueueSnackbar('Payment link copied to clipboard!', { variant: 'success' });
        })
        .catch((err) => {
          enqueueSnackbar('Failed to copy link', { variant: 'error' });
          console.error('Failed to copy link:', err);
        });
    }
  };

  return (
    <StyledGridContainer>
      <Dialog fullScreen open={openPaymentDialog} onClose={() => setPaymentDialog(false)}>
        <DialogData setPaymentDialog={setPaymentDialog} setStatus={setStatus} />
      </Dialog>
      
      <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <AgGridReact
          idProperty="id"
          columnDefs={columns}
          rowData={rowData}
          pagination={false}
          rowHeight={60}
          headerHeight={50}
          suppressCellSelection={true}
          suppressRowClickSelection={true}
          onGridReady={onGridReady}
          context={{ showPaymentDetails, copyLink }}
          loadingCellRenderer={loadingCellRenderer}
          loadingOverlayComponent={isPaymentTablePaginatedLoading ? CustomLoadingCellRenderer : undefined}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: { borderBottom: '1px solid rgba(0, 0, 0, 0.1)' },
            headerClass: 'ag-header-cell-label'
          }}
        />
      </div>
    </StyledGridContainer>
  );
}