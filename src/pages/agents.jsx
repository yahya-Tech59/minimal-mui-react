import { Helmet } from 'react-helmet-async';

import { AgentsView } from 'src/sections/Agents/view/index';

// ----------------------------------------------------------------------

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <AgentsView />
    </>
  );
}
