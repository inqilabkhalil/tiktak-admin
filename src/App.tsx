import { Navigate, Route, Routes } from 'react-router-dom';

import { CampaignsPage } from './pages/campaigns/campaign';
import CategoriesPage from './pages/categories/categories';
import ProductsPage from './pages/products/products';
import OrdersPage from './pages/orders';
import UsersPage from './pages/users';
import DashboardPage from './pages/dashboard';
import AuthPage from './pages/auth';
import { Layout } from './shared/components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/campaigns" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
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

export default App;
