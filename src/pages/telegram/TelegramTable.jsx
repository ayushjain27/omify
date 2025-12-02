/* eslint-disable react-hooks/exhaustive-deps */

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Chip, Dialog, IconButton, Tooltip, Typography, Paper, Skeleton } from '@mui/material';
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
import AnalyticsIcon from '@mui/icons-material/Analytics';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment';
import { useNavigate } from 'react-router';
import TelegramDialogData from './telegram-dialog-data';
import { getTelegramPageDetailsByIdApi } from '../../store/telegram/telegramApi';

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
      borderBottom: `2px solid ${theme.palette.divider}`
    },
    '& .ag-header-cell': {
      padding: '16px 8px',
      fontWeight: '600',
      fontSize: '14px',
      color: theme.palette.text.primary
    },
    '& .ag-row': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        backgroundColor: theme.palette.action.hover
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

const createRowData = (data) => {
  return {
    id: data?._id,
    image: data?.imageUrl,
    title: data?.title,
    description: data?.description,
    category: data?.category,
    status: data?.status,
    createdAt: moment(data?.createdAt).format('DD MMM YYYY, hh:mm A'),
    userId: data?.userName,
    channelId: data?.channelId
  };
};

export default function TelegramTable(props) {
  const { telegramList = [], selectedTab, isTelegramTablePaginatedLoading, setStatus } = props;
  const [gridApi, setGridApi] = useState(null);
  const [openTelegramDialog, setTelegramDialog] = useState(false);
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
      cellRenderer: ({ data }) => renderTelegramImage(data)
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
      field: 'category',
      headerName: 'Category',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      maxWidth: 120,
      cellRenderer: ({ data }) => (
        <Typography variant="body2" fontWeight="500" color="text.secondary">
          {data.category || 'Uncategorized'}
        </Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      maxWidth: 120,
      cellRenderer: ({ data }) => <StatusChip label={data.status?.toLowerCase() || 'Unknown'} status={data.status} size="small" />
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
      minWidth: 180,
      maxWidth: 180,
      cellRenderer: (params) => renderActionButtons(params.data, params.context)
    }
  ];

  useEffect(() => {
    if (!_.isEmpty(telegramList)) {
      const rowD = _.map(telegramList, (data) => createRowData(data));
      setRowData(rowD || []);
    } else {
      setRowData([]);
    }
  }, [selectedTab, telegramList]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const renderTelegramImage = (data) => (
    <ImageContainer>
      <img
        src={data?.image || '/assets/images/placeholder-image.jpg'}
        alt="Telegram"
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
          onClick={() => showTelegramDetails(data)}
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

  const renderActionButtons = (data, context) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Tooltip title="Edit Telegram Page">
        <IconButton
          size="small"
          onClick={() => context.handleEdit(data)}
          sx={{
            backgroundColor: 'warning.light',
            color: 'white',
            '&:hover': { backgroundColor: 'warning.main' }
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Copy Telegram Link">
        <IconButton
          size="small"
          onClick={() => {
            if (data?.status === 'INACTIVE') {
              enqueueSnackbar('Telegram Page is Inactive', { variant: 'error' });
            } else {
              context.copyLink(data);
            }
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

      <Tooltip title="View Analytics">
        <IconButton
          size="small"
          onClick={() => {
            navigate('/userData', { state: { telegramChannelId: data?.channelId } });
          }}
          sx={{
            backgroundColor: 'success.light',
            color: 'white',
            '&:hover': { backgroundColor: 'success.main' }
          }}
        >
          <AnalyticsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const showTelegramDetails = async (data) => {
    // You can implement Telegram detail view here if needed
    console.log('Telegram details:', data);
    const response = await dispatch(getTelegramPageDetailsByIdApi({ telegramId: data?.id }));
    setTelegramDialog(true);
    // await dispatch(getTelegramPageDetailByIdApi({ id: data?.id }));
    // setTelegramDialog(true);
  };

  const handleEdit = (data) => {
    // Navigate to edit page with only the page ID
    navigate('/create-telegram-page', { 
      state: { 
        isEdit: true, 
        id: data?.id
      } 
    });
  };

  const copyLink = (data) => {
    const linkToCopy = `http://localhost:3000/telegramLink?id=${data?.id || 'dmkemkd'}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        enqueueSnackbar('Telegram link copied to clipboard!', { variant: 'success' });
      })
      .catch((err) => {
        enqueueSnackbar('Failed to copy link', { variant: 'error' });
        console.error('Failed to copy link:', err);
      });
  };

  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);

  useEffect(() => {
    if (!gridApi) return;
    if (isTelegramTablePaginatedLoading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [isTelegramTablePaginatedLoading, gridApi]);

  return (
    <StyledGridContainer>
      {/* You can add a Telegram detail dialog here if needed */}
      <Dialog fullScreen open={openTelegramDialog} onClose={() => setTelegramDialog(false)}>
        <TelegramDialogData setTelegramDialog={setTelegramDialog} setStatus={setStatus} />
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
          context={{ showTelegramDetails, copyLink, handleEdit }}
          loadingCellRenderer={loadingCellRenderer}
          loadingOverlayComponent={isTelegramTablePaginatedLoading ? CustomLoadingCellRenderer : undefined}
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