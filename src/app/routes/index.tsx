import { Navigate, Route, Routes } from 'react-router-dom';

import { CampaignsPage } from '@/pages/campaigns/campaign';
import CategoriesPage from '@/pages/categories/categories';
import ProductsPage from '@/pages/products/products';

import UsersPage from '@/pages/users';
import AuthPage from '@/pages/auth';
import { Layout } from '@/shared/components/Layout';
import { OrdersPage } from '@/pages/orders/orders';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/campaigns" replace />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
