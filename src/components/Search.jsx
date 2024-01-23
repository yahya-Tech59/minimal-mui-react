import React from 'react';

import { Box, Icon, TextField } from '@mui/material';
import { CiSearch } from 'react-icons/ci';

export const Search = ({ label, variant, size, value, onChange }) => {
  return (
    <Box sx={{ mt: '-2rem' }}>
      <Icon
        sx={{
          ml: { md: '91rem', sm: '42rem' },
          fontSize: 28,
          position: 'relative',
          top: 6,
        }}
      >
        <CiSearch />
      </Icon>
      <TextField
        label={label}
        variant={variant}
        size={size}
        value={value}
        onChange={onChange}
        sx={{
          width: { md: 184, sm: 140 },
          ml: { md: '82rem', sm: '36rem' },
          mt: '-2rem',
        }}
        className="w-44 h-8 ml-[82rem] mt-[-20rem] shadow-sm shadow-slate-400 p-1 rounded-md bg-zinc-100"
      />
    </Box>
  );
};
