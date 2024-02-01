import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWebsiteVisits from '../userChart';
import AppWidgetSummary from '../DashboardCards';
import { Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppView() {
  // console.log('appView');
  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <select
          defaultValue=""
          style={{
            height: 20,
            border: 'none',
            color: '#3A57E8',
            bgcolor: '#fdfdfd',
            width: 100,
            marginTop: 13,
          }}
        >
          <option value="">Last 30 Days</option>
        </select>
      </Box>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary hide="Hide" title=" Agency" total={2590} year="year" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary hide="Hide" title="Customers" total={10000} year="year" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary hide="Hide" title="Products " total={100} year="year" />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary hide="Hide" title="Orders" total={150} />
        </Grid>

        <Grid xs={12} md={12} lg={12}>
          <AppWebsiteVisits
            title="Users"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                // {
                //   name: 'Team A',
                //   type: 'column',
                //   fill: 'solid',
                //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                // },
                // {
                //   name: 'Team B',
                //   type: 'area',
                //   fill: 'gradient',
                //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                // },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
