import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [taxes, setTaxes] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [promoCode, setPromoCode] = useState('');

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // Calculate subtotal using discounted price
    const subtotal = cartItems.reduce((sum, item) => {
        const discountedPrice = item.price * (1 - (item.discount ?? 0) / 100);
        return sum + discountedPrice * item.quantity;
    }, 0);

    const total = subtotal + taxes + shipping - discount;

    const addToCart = (product, quantity) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.pro_id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.pro_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [
                ...prev,
                {
                    id: product.pro_id,
                    name: product.pro_name,
                    price: product.price,
                    discount: product.discount || 0,
                    quantity,
                },
            ];
        });
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                subtotal,
                taxes,
                shipping,
                discount,
                promoCode,
                addToCart,
                clearCart,
                setTaxes,
                setShipping,
                setDiscount,
                setPromoCode,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);