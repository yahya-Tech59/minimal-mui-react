import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton } from '@mui/material';

import { EditAgent } from './EditAgent';
import { DeleteAgent } from './DeleteAgent';
import { useColumnsState } from 'src/hooks/ColumnsState';

export const columns = [
  { field: 'id', headerName: 'No', flex: 1 },
  { field: 'fullname', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
  { field: 'business', headerName: 'Business', flex: 1 },
  { field: 'phone', headerName: 'Contact', flex: 1 },
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
        editAnchorEl,
        deleteAnchorEl,
        handleEditPopoverOpen,
        handleEditPopoverClose,
        handleDeletePopoverOpen,
        handleDeletePopoverClose,
      } = useColumnsState();

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
            open={Boolean(editAnchorEl)}
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
            <EditAgent onClose={handleEditPopoverClose} id={editId} />
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
            open={Boolean(deleteAnchorEl)}
            anchorEl={deleteAnchorEl}
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
