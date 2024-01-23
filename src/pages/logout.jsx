import { Helmet } from 'react-helmet-async';

import SignOut from '../sections/Signout/SignOut';

// ----------------------------------------------------------------------

export default function LogoutPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <SignOut />
    </>
  );
}
