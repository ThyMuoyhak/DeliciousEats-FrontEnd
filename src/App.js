import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import Homepage from './components/pages/Homepage';
import Products from './components/pages/Products';
import DetailProduct from './components/DetailProduct';
import Footer from './components/Footer';
import './App.css';
import Features from './components/Feature';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // Import the new Checkout component
import OrderHistory from './components/OrderHistory'; // Import the new OrderHistory component
import Login from './components/Auth/Login';
import Account from './components/Account';
import About from './components/About';
import Contactpage from './components/pages/Contactpage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/products/:id" element={<DetailProduct />} />
                <Route path="/features" element={<Features />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} /> {/* Add Checkout route */}
                <Route path="/account/orders" element={<OrderHistory />} /> {/* Add OrderHistory route */}
                <Route path="/contact" element={<Contactpage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;