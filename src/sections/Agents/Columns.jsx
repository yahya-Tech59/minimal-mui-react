import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';
import { Box, Icon, IconButton, Popover, Button } from '@mui/material';

import { EditAgent } from './EditAgent';
import { DeleteAgent } from './DeleteAgent';

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
            <Box p={2}>
              <EditAgent onClose={handlePopoverClose} id={id} />
            </Box>
          </Popover>

          <IconButton
            onClick={(event) => {
              setId(row.id);
              setShowDeleteAgent(true);
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
              setShowDeleteAgent(false);
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
              <DeleteAgent onClose={() => setShowDeleteAgent(false)} id={id} />
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
