import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const SubmitButton = ({ label, onClick, type }) => (
  <Button
    type={type}
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

export default SubmitButton;

SubmitButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
