import axios from '../../../components/axios';
// import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';

// import { Header } from '../../layouts/Header';
import { DataGrid } from '@mui/x-data-grid';

// import { IoMdAdd } from 'react-icons/io';
// import { Search } from '../../components/Search';
import { Box, Card, Stack, Button, Popover, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Search } from 'src/components/Search';
import Scrollbar from 'src/components/scrollbar';

import { columns } from '../Columns';

// import { useModalState } from 'src/hooks/useModalState';
//import { Pagination } from 'src/components/Pagination';

export default function PermissionsView() {  
  const [permissions, setPermissions] = useState([]);
  const [per_page, setPer_page] = useState(10);
  const [last_Page, setLast_Page] = useState(25);
  const [loading, setLoading] = useState(false);

  //   const { add, handleAddPopoverOpen, handleAddPopoverClose } = useModalState();

  // ?_page=${current_page}&_limit=${per_page}

  const fetchUser = async (current_page) => {
    // const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
    // const token = localStorage.getItem('token');  
    try {
      const req = await axios.get(`/api/v1/permissions?page=${current_page}&_limit=${per_page}`);

      if (req.status === 200) {
        const responseData = req.data; 
        console.log(responseData);
        if (responseData && Array.isArray(responseData.data)) {
          setPermissions(responseData.data);
          setLast_Page(responseData.total);
        } else {
          console.error('Invalid data structure received from the API:', responseData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log('permissions:', permissions);
  }, []);

  // current_page, per_page

  if (loading === true) {
    return (
      <Typography variant="h2" sx={{ mr: '43rem' }}>
        Loading...
      </Typography>
    );
  }

  // const handlePageSizeChange = (newPageSize) => {
  //   setPer_page(newPageSize);
  //   setCurrent_page(1);
  // };

  return (
    <Container>
      <Card width={{ md: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={3}
          mt={2}
          position="relative"
          top={6}
        >
          <Typography variant="h4">Permissions</Typography>

          {/* <Button
            variant="contained"
            bgcolor="#3A57E8"
            ml="70rem"
            startIcon={<Iconify icon="eva:plus-fill" />}
            aria-describedby="new-agent-popover"
            onClick={handleAddPopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            New User
          </Button>
          <Popover
            id="new-product-popover"
            open={add}
            //anchorEl={anchorEl}
            onClose={handleAddPopoverClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <AddUser onClose={handleAddPopoverClose} />
          </Popover> */}
        </Stack>
        <Stack sx={{ ml: { md: '44rem', sm: '19rem' }, mb: 2 }}>
          <Search
            label="Search"
            variant="outlined"
            size="small"
            // value={searchText}
            // onChange={handleSearch}
          />
        </Stack>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <Box sx={{ height: 630, width: '95%', ml: { md: 5, sm: 3 }, mb: 4 }}>
            <DataGrid rows={permissions} columns={columns} getRowId={(row) => row.id} />
          </Box>
        </Scrollbar>
        {/* <Pagination /> */}
      </Card>
    </Container>
  );
}

// AgentsView.propTypes = {
//   agents: PropTypes.array,
// };
