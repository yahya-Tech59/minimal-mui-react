import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const ClearButton = ({ label, onClick }) => (
  <Button
    type="button"
    onClick={onClick}
    sx={{
      p: 3,
      px: 7,
      borderRadius: 4,
      width: 28,
      height: 12,
      bgcolor: '#3A57E8',
      '&:hover': {
        bgcolor: '#647ae6',
      },
      color: 'white',
    }}
  >
    {label}
  </Button>
);

export default ClearButton;

ClearButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
