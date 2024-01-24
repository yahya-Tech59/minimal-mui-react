import axios from 'axios';
// import { PropTypes } from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

// import { Header } from '../../layouts/Header';
// import { AddAgent } from '../AddAgent';
// import { IoMdAdd } from 'react-icons/io';
import { DataGrid } from '@mui/x-data-grid';
// import { Context } from '../../Context/Context';
// import useAgentsStore from '../../Services/AgentApi';
// import { Search } from '../../components/Search';
import { Box, Card, Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Search } from 'src/components/Search';
import Scrollbar from 'src/components/scrollbar';

import { columns } from '../Columns';
// import { Pagination } from '../../components/Pagination';

export default function AgentsView() {
  // const [showAddAgent, setShowAddAgent] = useState(false);
  const [agents, setAgents] = useState([]);
  const [current_page, setCurrent_page] = useState(1);
  const [per_page, setPer_page] = useState(10);

  const fetchAgent = useCallback(async () => {
    const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
    const token = localStorage.getItem('token');
    try {
      const req = await axios.get(
        `${baseURL}/api/v1/agents?_page=${current_page}&_limit=${per_page}`,
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
        if (responseData && responseData.data && Array.isArray(responseData.data)) {
          setAgents(responseData.data);
        } else {
          console.error('Invalid data structure received from the API:', responseData);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [current_page, per_page]);

  useEffect(() => {
    fetchAgent();
    console.log('Agents:', agents);
  }, []);

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
    setCurrent_page(1); // Reset page when changing page size
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
          <Typography variant="h4">Agents</Typography>

          <Button
            variant="contained"
            bgcolor="#3A57E8"
            ml="72rem"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Agent
          </Button>
        </Stack>
        <Stack sx={{ ml: { md: '46rem', sm: '19rem' }, mb: 2 }}>
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
            {console.log('Type of agents:', typeof agents)}
            <DataGrid
              rows={agents}
              columns={columns}
              pagination
              pageSize={per_page}
              paginationMode="server"
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
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
