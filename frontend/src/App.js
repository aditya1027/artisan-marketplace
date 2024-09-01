import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/home/HomePage';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ArtisanDashboard from './components/artisan/ArtisanDashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import AuthCheck from './components/auth/AuthCheck';
import TrackMyOrders from './components/orders/TrackMyOrders';

function App() {
  return (
    <Router>
      <AuthCheck />
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/my-orders' element={<TrackMyOrders />} />
          <Route
            path='/checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/artisan/dashboard' element={<ArtisanDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
