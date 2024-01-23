import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, IconButton } from '@mui/material';
// import { EditUser } from '../EditUser';
// import { DeleteUser } from '../DeleteUser';

export const columns = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'name', headerName: 'UserName', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    RenderCell: ({ row }) => {
      const [showEditUser, setShowEditUser] = useState(false);
      const [showDeleteUser, setShowDeleteUser] = useState(false);
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
              setShowEditUser(true);
              setId(row.id);
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
            <Icon sx={{ fontSize: 20 }}>
              <RiEditLine />
            </Icon>
          </IconButton>
          <IconButton
            onClick={() => {
              setShowDeleteUser(true);
              setId(row.id);
              alert('User Deleted Succesfully');
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
            <Icon sx={{ fontSize: 20 }}>
              <RiDeleteBin2Line />
            </Icon>
          </IconButton>

          {showEditUser && (
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
              {/* <EditUser onClose={() => setShowEditUser(false)} id={id} /> */}
            </Box>
          )}
          {showDeleteUser && (
            <Box>{/* <DeleteUser onClose={() => setShowDeleteUser(false)} id={id} /> */}</Box>
          )}
        </Box>
      );
    },
  },
];

columns.propTypes = {
  columns: PropTypes.array,
  row: PropTypes.number,
};
