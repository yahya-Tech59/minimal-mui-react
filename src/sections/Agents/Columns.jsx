import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton, Menu, MenuItem } from '@mui/material';

import { EditAgent } from './EditAgent';
import { DeleteAgent } from './DeleteAgent';
import { useModalState } from 'src/hooks/useModalState';

export const columns = [
  { field: 'id', headerName: 'No', flex: 1, headerStyle: { backgroundColor: '#d1d1d1' } },
  { field: 'fullname', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'business', headerName: 'Business', flex: 1 },
  { field: 'phone', headerName: 'Contact', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    // flex: 1,
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

      const [menuAnchor, setMenuAnchor] = React.useState(null);

      const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
      };

      const handleMenuClose = () => {
        setMenuAnchor(null);
      };

      return (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            mr: 122,
            ':hover': {
              color: 'black',
            },
          }}
        >
          <IconButton onClick={handleMenuOpen}>
            <Icon sx={{ fontSize: 21, fontWeight: 'semiBold', transform: 'rotate(90deg)' }}>
              ...
            </Icon>
          </IconButton>

          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          >
            <MenuItem
              onClick={() => {
                setEditId(row.id);
                handleEditPopoverOpen();
                handleMenuClose();
              }}
            >
              <RiEditLine />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteId(row.id);
                handleDeletePopoverOpen();
                handleMenuClose();
              }}
              display="flex"
            >
              <RiDeleteBin2Line />
              Delete
            </MenuItem>
          </Menu>

          <Popover
            open={edit}
            onClose={handleEditPopoverClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          >
            <EditAgent onClose={handleEditPopoverClose} id={editId} />
          </Popover>

          <Popover
            open={del}
            onClose={handleDeletePopoverClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Box>
              <DeleteAgent id={deleteId} />
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
