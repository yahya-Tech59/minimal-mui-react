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
    sortable: false,
    renderCell: ({ row }) => {
      const {
        editId,
        deleteId,
        editOpen,
        deleteOpen,
        handleEditOpen,
        handleEditClose,
        handleDeleteOpen,
        handleDeleteClose,
      } = useModalState();

      const [menuOpen, setMenuOpenl] = useState(null);

      const handleMenuOpen = (event) => {
        setMenuOpenl(event.currentTarget);
      };

      const handleMenuClose = () => {
        setMenuOpenl(null);
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
            <Icon
              sx={{ ml: 1.5, fontSize: 21, fontWeight: 'semiBold', transform: 'rotate(90deg)' }}
            >
              ...
            </Icon>
          </IconButton>

          <Menu anchorEl={menuOpen} open={Boolean(menuOpen)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleEditOpen(row.id)}>
              <RiEditLine />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteOpen(row.id)}>
              <RiDeleteBin2Line />
              Delete
            </MenuItem>
          </Menu>

          {/* EditAgent Popover */}
          <Popover open={editOpen} onClose={handleEditClose}>
            <EditAgent onClose={handleEditClose} id={editId} />
          </Popover>

          {/* DeleteAgent Popover */}
          <Popover open={deleteOpen} onClose={handleDeleteClose}>
            <DeleteAgent onClose={handleDeleteClose} id={deleteId} />
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
