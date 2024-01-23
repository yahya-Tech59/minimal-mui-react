import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';

import axios from 'axios';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { columns } from '../Columns';
// import TableNoData from '../table-no-data';
// import UserTableToolbar from '../user-table-toolbar';
// import { applyFilter, getComparator } from '../utils';
// import Table from '../../../components/Table';

// ----------------------------------------------------------------------

export default function UserPage() {
  // const [page, setPage] = useState(0);
  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('name');
  // const [selected, setSelected] = useState('');
  // const [filterName, setFilterName] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);

  const fetchUsers = async (page) => {
    const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
    const token = localStorage.getItem('token');
    const res = await axios.get(`${baseURL}/api/v1/users?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchUsers();
  });

  // const handleSort = (event, id) => {
  //   const isAsc = orderBy === id && order === 'asc';
  //   if (id !== '') {
  //     setOrder(isAsc ? 'desc' : 'asc');
  //     setOrderBy(id);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = users.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Card>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={3} mt={3}>
          <Typography variant="h4">Users</Typography>

          <Button
            variant="contained"
            bgcolor="#3A57E8"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          {/* <Table row={users} columns={columns} getRowId={(row) => row.id} onSort={handleSort} /> */}
          <Box sx={{ height: 630, width: '95%', ml: { md: 5, sm: 3 }, mb: 4 }}>
            <DataGrid rows={users} columns={columns} getRowId={(row) => row.id} />
          </Box>

          {/* {notFound && <TableNoData query={filterName} />} */}
        </Scrollbar>
      </Card>
    </Container>
  );
}
