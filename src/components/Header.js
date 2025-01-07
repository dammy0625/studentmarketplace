// src/components/Header.js
// src/components/Header.js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-xl"><Link to="/" className="hover:underline">Student Marketplace</Link></div>
          <div className="flex space-x-6">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-lg"
            />
            <button className="px-6 py-2 bg-green-600 rounded-lg"><Link to="/post-listing" className="hover:bg-green-600">Post a Listing</Link></button>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;


