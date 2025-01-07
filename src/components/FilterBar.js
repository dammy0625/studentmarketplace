// src/components/FilterBar.js
import React from 'react';

const FilterBar = () => {
  return (
    <div className="flex space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
      <select className="border p-2 rounded-lg">
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        <option value="books">Books</option>
      </select>
      <input
        type="number"
        className="border p-2 rounded-lg"
        placeholder="Max Price"
      />
      <button className="bg-blue-500 text-white p-2 rounded-lg">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;

