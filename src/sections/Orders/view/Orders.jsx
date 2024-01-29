import axios from 'axios';
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
import { useModalState } from 'src/hooks/useModalState';
import { AddOrder } from '../AddOrder';

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [last_Page, setLast_Page] = useState(25);

  const { add, handleAddPopoverOpen, handleAddPopoverClose } = useModalState();

  // ?_page=${current_page}&_limit=${per_page}
  const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
  const token = localStorage.getItem('token');

  const fetchOrder = async () => {
    try {
      const req = await axios.get(
        `${baseURL}/api/v1/orders?page=${current_page}&_limit=${per_page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (req.status === 200) {
        const responseData = req.data;
        console.log(responseData);
        if (responseData && Array.isArray(responseData.data)) {
          setOrders(responseData.data);
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
    fetchOrder();
    console.log('orders:', orders);
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
          <Typography variant="h4">Orders</Typography>

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
            onClick={handleAddPopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            New Order
          </Button>
          <Popover
            id="new-order-popover"
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
            <Box>
              <AddOrder onClose={handleAddPopoverClose} />
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
              rows={orders}
              columns={columns}
              pagination
              pageSize={per_page}
              paginationMode="server"
              onPageChange={(params) => handlePageChange(params.page)}
              onPageSizeChange={(params) => handlePageSizeChange(params.pageSize)}
              rowCount={last_Page}
              loading={!orders.length}
              pageSizeOptions={[10, 25, 100]}
              getRowId={(row) => row.id}
            />
          </Box>
          {/* <Table row={users} columns={columns} getRowId={(row) => row.id} onSort={handleSort} /> */}

          {/* {notFound && <TableNoData query={filterName} />} */}
        </Scrollbar>
      </Card>
    </Container>
  );
}

// AgentsView.propTypes = {
//   agents: PropTypes.array,
// };
