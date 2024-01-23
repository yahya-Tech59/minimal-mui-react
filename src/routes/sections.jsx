import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// import { ProtectedRoutes } from './ProtectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const AgentPage = lazy(() => import('src/pages/agents'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const LogoutPage = lazy(() => import('src/pages/logout'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/signIn',
      element: <LoginPage />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            {/* <ProtectedRoutes>
            </ProtectedRoutes> */}
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/dashboard', element: <IndexPage /> },
        { path: 'agent', element: <AgentPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'signOut', element: <LogoutPage /> },
        { path: '*', element: <Page404 /> },
      ],
    },
    // {
    //   path: '',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
