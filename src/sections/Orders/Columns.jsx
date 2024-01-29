import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton } from '@mui/material';

import { EditOrder } from './EditOrder';
import { DeleteOrder } from './DeleteOrder';

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
      const [id, setId] = useState(null);
      const [anchorEl, setAnchorEl] = useState(null);

      const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handlePopoverClose = () => {
        setAnchorEl(null);
      };

      const open = Boolean(anchorEl);

      return (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            ':hover': {
              color: 'black',
            },
          }}
        >
          <IconButton
            onClick={(event) => {
              setId(row.id);
              handlePopoverOpen(event);
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
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <EditOrder onClose={handlePopoverClose} id={id} />
          </Popover>

          <IconButton
            onClick={(event) => {
              setId(row.id);
              handlePopoverOpen(event);
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
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
              handlePopoverClose();
            }}
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
              {/* onClose={() => setShowDeleteAgent(false)} */}
              <DeleteOrder id={id} />
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
