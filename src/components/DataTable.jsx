import React from 'react';
import { Box, Card, Stack, Button, Popover, Container, Typography } from '@mui/material';
import Scrollbar from './scrollbar';

export const DataTable = () => {
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
            ml="72rem"
            startIcon={<Iconify icon="eva:plus-fill" />}
            aria-describedby="new-agent-popover"
            onClick={handleAddPopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
            New Agent
          </Button>
          <Popover
            id="new-agent-popover"
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
              <AddAgent onClose={handleAddPopoverClose} />
            </Box>
          </Popover>
        </Stack>
        <Stack sx={{ ml: { md: '46rem', sm: '19rem' }, mb: 2 }}>
          <Search
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={handleSearch}
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
            {/* {console.log('Type of agents:', typeof agents)} */}
            <DataGrid
              rows={agents}
              columns={columns}
              pagination
              pageSize={per_page}
              paginationMode="server"
              onPageChange={(params) => handlePageChange(params.page)}
              onPageSizeChange={(params) => handlePageSizeChange(params.pageSize)}
              rowCount={last_Page}
              loading={!agents.length}
              pageSizeOptions={[10, 25, 100]}
              getRowId={(row) => row.id}
              sx={{ fontSize: 16, border: 'none' }}
            />
          </Box>
          {/* <Table row={users} columns={columns} getRowId={(row) => row.id} onSort={handleSort} /> */}

          {/* {notFound && <TableNoData query={filterName} />} */}
        </Scrollbar>
      </Card>
    </Container>
  );
};
