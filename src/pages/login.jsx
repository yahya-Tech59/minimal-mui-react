import { Helmet } from 'react-helmet-async';

import { SignIn } from 'src/sections/login/index';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <SignIn />
    </>
  );
}
