import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Initialize cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      updateCartCount(parsedCart);
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount(cartItems);
    calculateCartTotals();
  }, [cartItems]);

  // Update cart count
  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Calculate cart totals
  const calculateCartTotals = () => {
    const cartSubtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const taxRate = 0.1; // 10% tax rate
    const cartTaxes = cartSubtotal * taxRate;
    const cartShipping = cartSubtotal > 50 ? 0 : 5.99;
    const cartDiscount = cartSubtotal * (promoDiscount / 100);
    const cartTotal = cartSubtotal + cartTaxes + cartShipping - cartDiscount;

    setSubtotal(cartSubtotal);
    setTaxes(cartTaxes);
    setShipping(cartShipping);
    setDiscount(cartDiscount);
    setTotal(cartTotal);
  };

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.pro_id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item => 
          item.id === product.pro_id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: product.pro_id,
          name: product.pro_name,
          price: parseFloat(product.price),
          image: product.image,
          quantity: quantity
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity: quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setPromoCode(null);
    setPromoDiscount(0);
  };

  // Apply promo code
  const applyPromoCode = (code, discountPercent) => {
    setPromoCode(code);
    setPromoDiscount(discountPercent);
    calculateCartTotals(); // Recalculate totals with discount
  };

  // Remove promo code
  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscount(0);
    calculateCartTotals(); // Recalculate totals without discount
  };

  // Context value
  const value = {
    cartItems,
    cartCount,
    subtotal,
    taxes,
    shipping,
    discount,
    total,
    promoCode,
    promoDiscount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;