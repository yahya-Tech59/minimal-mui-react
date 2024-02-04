import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function DashboardCards({ hide, title, total, sx, year }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        px: 3,
        py: 4, 
        borderRadius: 2,
        ...sx,
      }}
    >
      <Stack spacing={0.5}>
        <Box display="flex">
          <Typography variant="subtitle1" sx={{ color: 'text.disabled' }}>
            {hide}
          </Typography>

          <Typography
            variant="body1"
            bgcolor="#EBEEFD"
            color="#3A57E8"
            borderRadius="1rem"
            px={1.5}
            ml={28}
          >
            {year}
          </Typography>
        </Box>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

DashboardCards.propTypes = {
  hide: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  year: PropTypes.string,
};
