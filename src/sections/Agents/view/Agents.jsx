import axios from 'axios';
// import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';

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

  const fetchAgent = async () => {
    try {
      const baseURL = 'https://spiky-crater-dep2vxlep8.ploi.online';
      const token = localStorage.getItem('token');
      const req = await axios.get(`${baseURL}/api/v1/agents`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (req.status === 200) {
        setAgents(req.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  // if (loading === true) {
  //   return (
  //     <Typography variant="h2" sx={{ mr: '43rem' }}>
  //       Loading...
  //     </Typography>
  //   );
  // }

  return (
    <Container>
      <Card>
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
        <Stack sx={{ ml: { md: '46rem', sm: '42rem' }, mb: 2 }}>
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
            <DataGrid rows={agents} columns={columns} getRowId={(row) => row.id} />
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
