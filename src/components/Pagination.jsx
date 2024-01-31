import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

export const Pagination = () => {
  //   const { current_page, handlePageChange } = useContext(Context);
  const [current_page, setCurrent_page] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrent_page(newPage);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', ml: { md: '48rem', sm: '19rem' }, mt: 3, pb: 1 }}>
        <Button
          onClick={() => handlePageChange(current_page === 20)}
          sx={{
            bgcolor: 'primary.light',
            color: 'white',
            p: 1,
            m: 1,
            pl: 2,
            pr: 2,
            borderRadius: 3,
            ':hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_Page === 1}
          sx={{
            bgcolor: 'primary.light',
            color: 'white',
            p: 1,
            m: 1,
            pl: 2,
            pr: 2,
            borderRadius: 3,
            ':hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => handlePageChange(current_Page + 1)}
          disabled={current_Page === 20}
          sx={{
            bgcolor: 'primary.light',
            color: 'white',
            p: 1,
            m: 1,
            pl: 2,
            pr: 2,
            borderRadius: 3,
            ':hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          Next Page
        </Button>
        <Button
          onClick={() => handlePageChange()}
          sx={{
            bgcolor: 'primary.light',
            color: 'white',
            p: 1,
            m: 1,
            pl: 2,
            pr: 2,
            borderRadius: 3,
            ':hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          {'>>'}
        </Button>
      </Box>
    </Box>
  );
};
