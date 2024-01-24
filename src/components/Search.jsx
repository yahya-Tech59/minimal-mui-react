import React from 'react';
import PropTypes from 'prop-types';
import { CiSearch } from 'react-icons/ci';

import { Box, Icon, TextField } from '@mui/material';

export const Search = ({ label, variant, size, value, onChange }) => {
  return (
    <Box mt="-2rem">
      <Icon
        sx={{
          fontSize: 28,
          position: 'relative',
          top: 2,
          left: 212,
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
        width={{ md: 184, sm: 140 }}
        ml={{ md: '82rem', sm: '36rem' }}
        mt="-2rem"
      />
    </Box>
  );
};

Search.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
