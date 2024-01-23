import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';

const CloseButton = ({ onClick }) => (
  <Button
    onClick={onClick}
    sx={{
      p: 3,
      px: 6,
      borderRadius: 4,
      width: 24,
      height: 12,
      bgcolor: '#3A57E8',
      '&:hover': {
        bgcolor: '#647ae6',
      },
      color: 'white',
    }}
  >
    {/* <Typography variant="h6"></Typography> */}
    Close
  </Button>
);

export default CloseButton;

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
