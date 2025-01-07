// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/listings/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="container mx-auto p-4">
       <button
        className="bg-gray-500 text-white p-2 rounded-lg mb-4"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[500px]  rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold text-blue-600">
            ₦{parseInt(product.price).toLocaleString()}
          </p>
          <p className="text-gray-500">Location: {product.location}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            <p className="text-gray-600">Name: {product.sellerName || "Anonymous"}</p>
            <p className="text-gray-600">Contact: {product.sellerContact || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
