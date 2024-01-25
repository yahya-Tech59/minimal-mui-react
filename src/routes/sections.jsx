import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// import { ProtectedRoutes } from './ProtectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const AgentsPage = lazy(() => import('src/pages/agents'));
export const CustomersPage = lazy(() => import('src/pages/Customers'));
export const OrdersPage = lazy(() => import('src/pages/orders'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const LogoutPage = lazy(() => import('src/pages/logout'));
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
        { path: 'agents', element: <AgentsPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'orders', element: <ordersPage /> },
        { path: 'user', element: <UserPage /> },
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
