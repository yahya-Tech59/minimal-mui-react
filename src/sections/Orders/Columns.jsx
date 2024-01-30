import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton } from '@mui/material';

import { EditOrder } from './EditOrder';
import { DeleteOrder } from './DeleteOrder';
import { useModalState } from 'src/hooks/useModalState';

export const columns = [
  { field: 'id', headerName: 'No', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  {
    field: 'product_id',
    headerName: 'Product',
    flex: 1,
    renderCell: ({ row }) => <>{row.product?.name}</>,
  },
  {
    field: 'product_price_id',
    headerName: 'Product-Price',
    flex: 1,
    renderCell: ({ row }) => <>{row.product?.price}</>,
  },
  {
    field: 'product_commission',
    headerName: 'Product-Commission',
    flex: 1,
    renderCell: ({ row }) => <>{row.product?.price}</>,
  },
  {
    field: 'customer',
    headerName: 'Customer',
    flex: 1,
    renderCell: ({ row }) => {
      const customer = row.customer && row.customer.length > 0 ? row.customer[0] : null;
      return <>{customer ? customer.fullname : ''}</>;
    },
  },
  {
    field: 'agent',
    headerName: 'Agent',
    flex: 1,
    renderCell: ({ row }) => {
      const agent = row.agent && row.agent.length > 0 ? row.agent[0] : null;
      return <>{agent ? agent.fullname : ''}</>;
    },
  },
  { field: 'status_label', headerName: 'Status-Label', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => {
      const {
        editId,
        setEditId,
        deleteId,
        setDeleteId,
        edit,
        del,
        handleEditPopoverOpen,
        handleEditPopoverClose,
        handleDeletePopoverOpen,
        handleDeletePopoverClose,
      } = useModalState();

      return (
        <Box display="flex" gap={2} justifyContent="center">
          <IconButton
            onClick={(event) => {
              setEditId(row.id);
              handleEditPopoverOpen(event);
            }}
            sx={{
              bgcolor: '#3A57E8',
              color: 'white',
              borderRadius: '100%',
              ':hover': {
                bgcolor: '#4562f7',
              },
            }}
          >
            <Icon sx={{ fontSize: 21 }}>
              <RiEditLine />
            </Icon>
          </IconButton>
          <Popover
            open={edit}
            //anchorEl={editAnchorEl}
            onClose={handleEditPopoverClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <EditOrder onClose={handleEditPopoverClose} id={editId} />
          </Popover>

          <IconButton
            onClick={(event) => {
              setDeleteId(row.id);
              handleDeletePopoverOpen(event);
            }}
            sx={{
              bgcolor: '#3A57E8',
              color: 'white',
              borderRadius: '100%',
              ':hover': {
                bgcolor: '#4562f7',
              },
            }}
          >
            <Icon sx={{ fontSize: 21 }}>
              <RiDeleteBin2Line />
            </Icon>
          </IconButton>
          <Popover
            open={del}
            //anchorEl={deleteAnchorEl}
            onClose={handleDeletePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Box>
              <DeleteOrder id={deleteId} />
            </Box>
          </Popover>
        </Box>
      );
    },
  },
];

columns.propTypes = {
  columns: PropTypes.array,
  onClose: PropTypes.func,
};
