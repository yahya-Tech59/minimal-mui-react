import axios from 'axios';
// import { PropTypes } from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

// import { Header } from '../../layouts/Header';
import { DataGrid } from '@mui/x-data-grid';

// import { IoMdAdd } from 'react-icons/io';
// import { Search } from '../../components/Search';
import { Box, Card, Stack, Button, Popover, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Search } from 'src/components/Search';
import Scrollbar from 'src/components/scrollbar';

import { columns } from '../Columns';
//import { AddCustomer } from '../AddCustomer';

export default function AgentsView() {
  const [customers, setCustomers] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [last_Page, setLast_Page] = useState(25);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // ?_page=${current_page}&_limit=${per_page}

  const fetchCustomer = async () => {
    const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
    const token = localStorage.getItem('token');
    try {
      const req = await axios.get(
        `${baseURL}/api/v1/customers?page=${current_page}&_limit=${per_page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          customers,
        }
      );

      if (req.status === 200) {
        const responseData = req.data;
        console.log(responseData);
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          setCustomers(responseData.data);
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
    fetchCustomer();
    console.log('customers:', customers);
  }, []);

  // current_page, per_page

  // useEffect(() => {
  //   console.log('Agents:', agents);
  // }, [agents]);

  // if (loading === true) {
  //   return (
  //     <Typography variant="h2" sx={{ mr: '43rem' }}>
  //       Loading...
  //     </Typography>
  //   );
  // }

  const handlePageChange = (newPage) => {
    setCurrent_page(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPer_page(newPageSize);
    setCurrent_page(1);
  };

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
          <Typography variant="h4">Customers</Typography>

          {/* <Button
            variant="contained"
            bgcolor="#3A57E8"
            ml="72rem"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Agent
          </Button> */}
          <Button
            variant="contained"
            bgcolor="#3A57E8"
            ml="70rem"
            startIcon={<Iconify icon="eva:plus-fill" />}
            aria-describedby="new-agent-popover"
            onClick={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            New Customer
          </Button>
          <Popover
            id="new-customer-popover"
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
            <Box
              sx={{
                position: 'relative',
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
              {/* <AddAgent onClose={handlePopoverClose} /> */}
            </Box>
          </Popover>
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
            <DataGrid
              rows={customers}
              columns={columns}
              pagination
              pageSize={per_page}
              paginationMode="server"
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              rowCount={last_Page}
              loading={!customers.length}
              pageSizeOptions={[10, 25, 100]}
              getRowId={(row) => row.id}
            />
          </Box>
        </Scrollbar>
      </Card>
    </Container>
  );
}

// AgentsView.propTypes = {
//   agents: PropTypes.array,
// };
