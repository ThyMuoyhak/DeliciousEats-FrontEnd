import React from 'react';
import CardProduct from '../CardProduct';
import '../styles/Hero.css';

const Products = () => {
  return (
    <div className="products-page">
      {/* Products page header section */}
      <div className="products-hero">
        <div className="products-hero-overlay"></div>
        <div className="products-hero-content">
         
        </div>
      </div>
      
      {/* Include the CardProduct component */}
      <CardProduct />
    </div>
  );
};

export default Products;