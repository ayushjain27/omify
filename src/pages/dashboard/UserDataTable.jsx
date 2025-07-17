/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Chip, Dialog } from '@mui/material';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import '@inovua/reactdatagrid-community/base.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CustomLoadingCellRenderer } from '../../utils/constant';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment';
import DialogData from './DialogData';
import { getUserDataByUserIdApi } from '../../store/auth/authApi';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const gridStyle = { height: '100%', contain: 'none' };

const createRowData = (data, callBackFns) => {
  const result = {
    id: data?._id,
    paymentId: data?.paymentId,
    name: data?.name,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    amount: `₹ ${data?.paymentAmount}`,
    // socialLink: data?.socialLink,
    // socialLinkSelected: data?.socialLinkSelected,
    createdAt: moment(data?.createdAt).format('DD-MMM-YYYY hh:mm:ss'),
    ...callBackFns
  };
  // Add any other payment-related fields you need to display
  return result;
};

export default function UserDataTable(props) {
  const { userDataList = [], isUserDataPaginatedLoading } = props;
  const [gridApi, setGridApi] = useState(null);
  const [openUserDialog, setUserDialog] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      field: 'paymentId',
      headerName: 'Payment Id',
      filter: 'agNumberColumnFilter',
      minWidth: 120,
      editable: false,
      cellRenderer: (params) => openUserDetails(params.data)
    },
    {
      field: 'name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      minWidth: 150,
      editable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      editable: false
      // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    },
    {
      field: 'phoneNumber',
      headerName: 'PhoneNumber',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      editable: false
      // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    },
    {
      field: 'amount',
      headerName: 'Amount',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      editable: false
      // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    },
    // {
    //   field: 'socialLinkSelected',
    //   headerName: 'Social Link Type',
    //   filter: 'agTextColumnFilter',
    //   minWidth: 120,
    //   editable: false
    //   // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    // },
    // {
    //   field: 'socialLink',
    //   headerName: 'Social Link',
    //   filter: 'agTextColumnFilter',
    //   minWidth: 120,
    //   editable: false
    //   // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    // },
    {
      field: 'createdAt',
      headerName: 'Date',
      filter: 'agDateColumnFilter',
      minWidth: 180,
      editable: false,
      sortable: true
    }
  ];

  const openUserDetails = (data) =>
    data?.userName && (
      <Chip
        label={data.userName} // Use the actual status from data
        size="small"
        color="success" // Example of conditional coloring
        variant="outlined"
        style={{ marginLeft: 4 }}
        onClick={() => showUserDetails(data)}
      />
    );

  useEffect(() => {
    if (!_.isEmpty(userDataList)) {
      const rowD = _.map(userDataList, (data) => createRowData(data, { showUserDetails }));
      setRowData(rowD || []);
    } else {
      setRowData([]);
    }
  }, [userDataList]);

  const showUserDetails = async (data) => {
    await dispatch(getUserDataByUserIdApi({ userName: data?.userName }));
    setUserDialog(true);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);

  useEffect(() => {
    if (!gridApi) return;

    if (isUserDataPaginatedLoading) {
      gridApi.showLoadingOverlay();
    } else {
      gridApi.hideOverlay();
    }
  }, [isUserDataPaginatedLoading, gridApi]);

  return (
    <Box sx={{ height: '65vh', width: '100%' }}>
      {/* <Dialog fullScreen open={openUserDialog} onClose={() => setUserDialog(false)}>
        <DialogData setUserDialog={setUserDialog} setStatus={setStatus} />
      </Dialog> */}
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          idProperty="id"
          columnDefs={columns}
          rowData={rowData}
          pagination={false}
          paginationPageSize={10}
          rowHeight={50}
          headerHeight={50}
          rowSelection="multiple"
          onGridReady={onGridReady}
          masterDetail
          context={{
            showUserDetails
          }}
          loadingCellRenderer={loadingCellRenderer}
          loadingOverlayComponent={isUserDataPaginatedLoading ? CustomLoadingCellRenderer : undefined}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
            flex: 1,
            cellStyle: {
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center'
            },
            headerClass: 'ag-header-cell-label'
          }}
        />
      </div>
    </Box>
  );
}
