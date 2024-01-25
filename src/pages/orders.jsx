import { Helmet } from 'react-helmet-async';

import { OrdersView } from 'src/sections/Orders/view/index';

// ----------------------------------------------------------------------

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <OrdersView />
    </>
  );
}
