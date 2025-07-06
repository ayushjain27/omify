/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
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

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const gridStyle = { height: '100%', contain: 'none' };

const createRowData = (data) => {
  const result = {
    id: data?._id,
    title: data?.pageTitle,
    description: data?.description,
    price: `Rs ${data?.price}`,
    status: data?.status,
    createdAt: moment(data?.createdAt).format('DD-MMM-YYYY hh:mm:ss'),
    userId: data?.userName
  }
    // Add any other payment-related fields you need to display
  return result;
};

export default function PaymentTable(props) {
  const { paymentList = [], selectedTab, isPaymentTablePaginatedLoading } = props;
  const [gridApi, setGridApi] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      filter: 'agNumberColumnFilter',
      minWidth: 120,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
      minWidth: 150,
      editable: false
    },
    {
      field: 'price',
      headerName: 'Price',
      filter: 'agTextColumnFilter',
      minWidth: 120,
      editable: false,
      // valueFormatter: params => `Rs{params.value?.toFixed(2) || '0.00'}`
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      filter: 'agDateColumnFilter',
      minWidth: 180,
      editable: false,
      sortable: true
    }
  ];
  // if (selectedTab === 'manufacturer') {
  //   columns.splice(1, 0, {
  //     name: 'createdUser',
  //     header: 'Created OEM User',
  //     minWidth: 150,
  //     editable: true
  //   });
  // }

  useEffect(() => {
    if (!_.isEmpty(paymentList)) {
      const rowD = _.map(paymentList, (data) => createRowData(data));
      setRowData(rowD || []);
    } else {
      setRowData([]);
    }
  }, [selectedTab, paymentList]);

  const onGridReady = (params) => {
    setGridApi(params.api);
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

  return (
    <Box sx={{ height: '65vh', width: '100%' }}>
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
          masterDetail={false}
          loadingCellRenderer={loadingCellRenderer}
          loadingOverlayComponent={isPaymentTablePaginatedLoading ? CustomLoadingCellRenderer : undefined}
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
            headerClass: 'ag-header-cell-label',
          }}
        />
      </div>
    </Box>
  );
}