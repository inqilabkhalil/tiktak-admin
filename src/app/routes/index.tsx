import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import { CampaignsPage } from '@/pages/campaigns/campaign';
import CategoriesPage from '@/pages/categories/categories';
import ProductsPage from '@/pages/products/products';
import { OrdersPage } from '@/pages/orders/orders';
import UsersPage from '@/pages/users';
import Login from '@/pages/auth';

import { Layout } from '@/shared/components/Layout';

export function AppRoutes() {
  return (
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
  );
}
