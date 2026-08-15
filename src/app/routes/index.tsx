import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const CampaignsPage = lazy(() =>
  import('@/pages/campaigns/campaign').then((m) => ({ default: m.CampaignsPage }))
);
const CategoriesPage = lazy(() => import('@/pages/categories/categories'));
const ProductsPage = lazy(() => import('@/pages/products/products'));
const OrdersPage = lazy(() =>
  import('@/pages/orders/orders').then((m) => ({ default: m.OrdersPage }))
);
const UsersPage = lazy(() => import('@/pages/users'));
const Login = lazy(() => import('@/pages/auth'));

import { Layout } from '@/shared/components/Layout';
import { Loader } from '@/shared/components/Loader';

export function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>

      <Route path="/auth" element={<Login />} />
    </Routes>
    </Suspense>
  );
}
