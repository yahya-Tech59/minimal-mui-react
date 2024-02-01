import { Helmet } from 'react-helmet-async';

import { PermissionsView } from 'src/sections/permissions/view';

// ----------------------------------------------------------------------

export default function UsersPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <PermissionsView />
    </>
  );
}
