export const columns = [
  { field: 'id', headerName: 'Id', flex: 1 },
  { field: 'name', headerName: 'UserName', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: ({ row }) => {
      const [open, setOpen] = useState(null);

      const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
        setId(row.id);
      };

      const handleCloseMenu = () => {
        setOpen(null);
      };
      const [id, setId] = useState(null);

      return (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>

        //  {showEditUser && (
        //     <Box
        //       sx={{
        //         position: 'absolute',
        //         top: 0,
        //         left: 0,
        //         right: 0,
        //         bottom: 0,
        //         display: 'flex',
        //         alignItems: 'center',
        //         justifyContent: 'center',
        //         backgroundColor: 'rgba(0, 0, 0, 0.2)',
        //       }}
        //     >
        //       <EditUser onClose={() => setShowEditUser(false)} id={id} />
        //     </Box>
        //   )}
        //   {showDeleteUser && (
        //     <Box>
        //       <DeleteUser onClose={() => setShowDeleteUser(false)} id={id} />
        //     </Box>
        //   )}
      );
    },
  },
];
