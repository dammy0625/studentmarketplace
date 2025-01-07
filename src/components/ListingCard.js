// src/components/ListingCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ id,title, price, location, image, isNew }) => {
   // Format the price with Naira sign and commas
   const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
  return (
    <Link to={`/product/${id}`} className="block">
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
        {isNew && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          New
        </div>
      )}
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold truncate">{title}</h3>
        <p className="text-gray-500 truncate">{location}</p>
        <p className="text-lg font-bold text-blue-500">{formattedPrice}</p>
      </div>
     
    </div>
    </Link>
  );
};

export default ListingCard;

