import { Helmet } from 'react-helmet-async';

import { CustomersView } from 'src/sections/Customers/view/index';

// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <CustomersView />
    </>
  );
}
