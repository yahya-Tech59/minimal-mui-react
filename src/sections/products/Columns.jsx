import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton } from '@mui/material';
import { useModalState } from 'src/hooks/useModalState';

import { EditProduct } from './EditProduct';
import { DeleteProduct } from './DeleteProduct';

export const columns = [
  { field: 'id', headerName: 'No', flex: 1 },
  { field: 'name', headerName: 'Prod_Name', flex: 1 },
  { field: 'price', headerName: 'Price', flex: 1 },
  { field: 'commission', headerName: 'Commission', flex: 1 },
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
            <EditProduct onClose={handleEditPopoverClose} id={editId} />
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
              <DeleteProduct id={deleteId} />
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
