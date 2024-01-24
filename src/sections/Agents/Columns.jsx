import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

// import { del, edit } from "../../assets/img";
import { Box, Icon, IconButton } from '@mui/material';
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
    RenderCell: ({ row }) => {
      const [showEditAgent, setShowEditAgent] = useState(false);
      const [showDeleteAgent, setShowDeleteAgent] = useState(false);
      const [id, setId] = useState(null);

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
            onClick={() => {
              setId(row.id);
              setShowEditAgent(true);
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
          <IconButton
            onClick={() => {
              setId(row.id);
              setShowDeleteAgent(true);
              alert('deleted successfuly');
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

          {showEditAgent && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              }}
            >
              <EditAgent onClose={() => setShowEditAgent(false)} id={id} />
            </Box>
          )}
          {showDeleteAgent && (
            <Box>
              <DeleteAgent onClose={() => setShowDeleteAgent(false)} id={id} />{' '}
            </Box>
          )}
        </Box>
      );
    },
  },
];

columns.propTypes = {
  columns: PropTypes.array,
};
