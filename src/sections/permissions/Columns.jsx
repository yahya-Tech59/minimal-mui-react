import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { RiEditLine, RiDeleteBin2Line } from 'react-icons/ri';

import { Box, Icon, Popover, IconButton } from '@mui/material';

// import { EditUser } from './EditUsers';
// import { DeleteUser } from './DeleteUser';
// import { useModalState } from 'src/hooks/useModalState';

export const columns = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'title', headerName: 'Title', flex: 1 },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     flex: 1,
  //     sortable: false,
  //     renderCell: ({ row }) => {
  //       const {
  //         editId,
  //         setEditId,
  //         deleteId,
  //         setDeleteId,
  //         edit,
  //         del,
  //         handleEditPopoverOpen,
  //         handleEditPopoverClose,
  //         handleDeletePopoverOpen,
  //         handleDeletePopoverClose,
  //       } = useModalState();

  //       return (
  //         <Box
  //           sx={{
  //             display: 'flex',
  //             gap: 2,
  //             justifyContent: 'center',
  //             ':hover': {
  //               color: 'black',
  //             },
  //           }}
  //         >
  //           <IconButton
  //             onClick={(event) => {
  //               setEditId(row.id);
  //               handleEditPopoverOpen(event);
  //             }}
  //             sx={{
  //               bgcolor: '#3A57E8',
  //               color: 'white',
  //               borderRadius: '100%',
  //               ':hover': {
  //                 bgcolor: '#4562f7',
  //               },
  //             }}
  //           >
  //             <Icon sx={{ fontSize: 21 }}>
  //               <RiEditLine />
  //             </Icon>
  //           </IconButton>
  //           <Popover
  //             open={edit}
  //             //anchorEl={editAnchorEl}
  //             onClose={handleEditPopoverClose}
  //             anchorOrigin={{
  //               vertical: 'center',
  //               horizontal: 'center',
  //             }}
  //             transformOrigin={{
  //               vertical: 'center',
  //               horizontal: 'center',
  //             }}
  //           >
  //             <EditUser onClose={handleEditPopoverClose} id={editId} />
  //           </Popover>

  //           <IconButton
  //             onClick={(event) => {
  //               setDeleteId(row.id);
  //               handleDeletePopoverOpen(event);
  //             }}
  //             sx={{
  //               bgcolor: '#3A57E8',
  //               color: 'white',
  //               borderRadius: '100%',
  //               ':hover': {
  //                 bgcolor: '#4562f7',
  //               },
  //             }}
  //           >
  //             <Icon sx={{ fontSize: 21 }}>
  //               <RiDeleteBin2Line />
  //             </Icon>
  //           </IconButton>
  //           <Popover
  //             open={del}
  //             //anchorEl={deleteAnchorEl}
  //             onClose={handleDeletePopoverClose}
  //             anchorOrigin={{
  //               vertical: 'bottom',
  //               horizontal: 'left',
  //             }}
  //             transformOrigin={{
  //               vertical: 'top',
  //               horizontal: 'left',
  //             }}
  //           >
  //             <Box>
  //               <DeleteUser id={deleteId} />
  //             </Box>
  //           </Popover>
  //         </Box>
  //       );
  //     },
  //   },
];

columns.propTypes = {
  columns: PropTypes.array,
  onClose: PropTypes.func,
};
