import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

// import { ProtectedRoutes } from './ProtectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const AgentsPage = lazy(() => import('src/pages/agents'));
export const CustomersPage = lazy(() => import('src/pages/Customers'));
export const OrdersPage = lazy(() => import('src/pages/orders'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const UsersPage = lazy(() => import('src/pages/users'));
export const PermissionsPage = lazy(() => import('src/pages/permissions'));
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
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'agents', element: <AgentsPage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'orders', element: <OrdersPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'permissions', element: <PermissionsPage /> },
        { path: 'signOut', element: <LogoutPage /> },
      ],
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
