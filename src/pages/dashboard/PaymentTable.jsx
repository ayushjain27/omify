/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import _ from 'lodash';
// import { MIconButton } from 'components/@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { useDispatch } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
// import '@inovua/reactdatagrid-community/base.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CustomLoadingCellRenderer } from '../../utils/constant';

const gridStyle = { height: '100%', contain: 'none' };

// const actionCellRenderer = (data, user) => {
//   // Early return if no data or no UPDATE permission
//   if (!data || !user?.accessList?.REWARDS?.UPDATE) return null;

//   // Check if user has permission to see actions
//   const showActions = user?.role === 'ADMIN' || user?.oemId === 'SERVICEPLUG';

//   if (!showActions) return null;

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'center'
//       }}
//     >
//       {data.status === 'INACTIVE' && (
//         <Tooltip title="Activate Reward">
//           <IconButton onClick={() => data.onApproveReward?.(data)}>
//             <ThumbUpIcon fontSize="small" sx={{ color: '#01ab55' }} />
//           </IconButton>
//         </Tooltip>
//       )}
//       {data.status === 'ACTIVE' && (
//         <Tooltip title="Deactivate Reward">
//           <IconButton onClick={() => data.onRejectReward?.(data)}>
//             <ThumbDownIcon fontSize="small" sx={{ color: '#f44336' }} />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Box>
//   );
// };

const createRowData = (data, callBackFns) => {
  const rewardData = {
    id: data?._id,
    // userName: data?.userName,
    // selectedUserName: data?.selectedUserName,
    // image: data?.rewardsImageUrl,
    // title: data?.title,
    // quantity: data?.quantity,
    // createdAt: moment(data?.createdAt).format('DD-MMM-YYYY hh:mm:ss'),
    // eligibleUsers: data?.eligibleUsers,
    // eligibleMonths: data?.eligibleMonths,
    // description: data?.description,
    // status: data?.status,
    // action: '',
    ...callBackFns
  };

  return rewardData;
};

export default function PaymentTable(props) {
  const { paymentList = [], selectedTab, isPaymentTablePaginatedLoading } = props;
  const [gridApi, setGridApi] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  // const [selectedRewardApproved, setSelectedRewardApproved] = useState({});
  // const [approveDialog, setApproveDialog] = useState(false);
  // const [rejectDialog, setRejectDialog] = useState(false);

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      filter: 'agTextColumnFilter',
      minWidth: 160,
      editable: false
      // cellRenderer: (params) => openVehicleDetails(params.data)
    },
    {
      field: 'description',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
      minWidth: 160,
      editable: false
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      filter: 'agTextColumnFilter',
      type: 'number',
      minWidth: 160,
      editable: false
    },
    {
      field: 'eligibleUsers',
      headerName: 'Eligible Users',
      filter: 'agTextColumnFilter',
      type: 'number',
      minWidth: 160,
      editable: false
    },
    {
      field: 'eligibleMonths',
      headerName: 'Eligible Months',
      filter: 'agTextColumnFilter',
      type: 'number',
      minWidth: 160,
      editable: false
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      filter: 'agTextColumnFilter',
      type: 'number',
      minWidth: 160,
      editable: false
    }
  ];
  // if (user?.role === 'ADMIN' || user?.oemId === 'SERVICEPLUG') {
  //   columns.splice(1, 0, {
  //     field: 'userName',
  //     headerName: 'User Name',
  //     filter: 'agTextColumnFilter',
  //     minWidth: 160,
  //     editable: false
  //   });
  //   columns.splice(2, 0, {
  //     field: 'selectedUserName',
  //     headerName: 'Selected User Name',
  //     filter: 'agTextColumnFilter',
  //     minWidth: 160,
  //     editable: false
  //   });
  //   columns.splice(9, 0, {
  //     field: 'action',
  //     headerName: 'Action',
  //     description: 'This column has a value getter and is not sortable.',
  //     minWidth: 160,
  //     sortable: false,
  //     cellRenderer: ({ data }) => actionCellRenderer(data, user)
  //   });
  // }

  useEffect(() => {
    if (!_.isEmpty(paymentList)) {
      const rowD = _.map(paymentList, (data) => createRowData(data, { onApproveReward, onRejectReward }));
      setRowData(rowD || []);
    }

    if (_.isEmpty(paymentList)) setRowData(paymentList || []);
  }, [selectedTab, paymentList]);

  // const onRejectReward = (reward) => {
  //   setRejectDialog(true);
  //   setSelectedRewardApproved(reward);
  // };

  // const showNotification = (variant, message) => {
  //   enqueueSnackbar(message, {
  //     variant,
  //     action: (key) => (
  //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
  //         <Icon icon={closeFill} />
  //       </MIconButton>
  //     )
  //   });
  // };

  // const onApproveReward = (reward) => {
  //   setApproveDialog(true);
  //   setSelectedRewardApproved(reward);
  // };

  // const onApproveAgree = async () => {
  //   const params = {};
  //   params.rewardId = selectedRewardApproved?.id;
  //   params.status = 'ACTIVE';
  //   try {
  //     let res = await dispatch(updateRewardStatusApi(params));
  //     res = unwrapResult(res);
  //     showNotification('success', 'Reward Active Succesfully');
  //     setUpdateStatus(true);
  //     closeApproveDialog();
  //   } catch (err) {
  //     showNotification('error', 'Operation Failed');
  //   }
  // };

  // const onRejectAgree = async () => {
  //   const params = {};
  //   params.rewardId = selectedRewardApproved?.id;
  //   params.status = 'INACTIVE';
  //   try {
  //     let res = await dispatch(updateRewardStatusApi(params));
  //     res = unwrapResult(res);
  //     showNotification('success', 'Reward In-Active Succesfully');
  //     setUpdateStatus(true);
  //     closeRejectDialog();
  //   } catch (err) {
  //     showNotification('error', 'Operation Failed');
  //   }
  // };

  // const closeApproveDialog = () => {
  //   setApproveDialog(false);
  //   setSelectedRewardApproved({});
  // };

  // const closeRejectDialog = () => {
  //   setRejectDialog(false);
  //   setSelectedRewardApproved({});
  // };

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const loadingCellRenderer = useCallback(CustomLoadingCellRenderer, []);

  // Show/hide loading overlay
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
      {/* <Dialog fullScreen open={openVehicleDetailDialog} onClose={() => setVehicleDetailDialog(false)}>
        <DialogData setVehicleDetailDialog={setVehicleDetailDialog} vehicleData={vehicleData} />
      </Dialog> */}
      {/* <ConfirmationDialog
        open={approveDialog}
        handleClose={closeApproveDialog}
        onAgree={onApproveAgree}
        dialogContent="Are you sure you want to active this Reward?"
        titleContent="Active Confirmation"
        agreeText="Active"
        disagreeText="Cancel"
      />
      <ConfirmationDialog
        open={rejectDialog}
        handleClose={closeRejectDialog}
        onAgree={onRejectAgree}
        dialogContent="Are you sure you want to inactive this Reward?"
        titleContent="InActive Confirmation"
        agreeText="InActive"
        disagreeText="Cancel"
      /> */}
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          idProperty="id"
          columnDefs={columns}
          rowData={rowData}
          pagination={false}
          rowSelection="multiple"
          suppressRowClickSelection={false}
          onGridReady={onGridReady}
          enableRangeSelection={false}
          masterDetail
          // context={{
          //   onApproveReward,
          //   onRejectReward,
          //   user
          // }}
          loadingCellRenderer={loadingCellRenderer}
          loadingOverlayComponent={isPaymentTablePaginatedLoading ? CustomLoadingCellRenderer : undefined}
        />
      </div>
    </Box>
  );
}
