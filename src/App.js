import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// Importing the components for your app
import Header from './components/Header';
import Home from './components/Home';
import FilterBar from './components/FilterBar';
import PostListing from './components/PostListing';
import ProductPage from './components/productpage';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="container mx-auto p-4">
            <FilterBar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/post-listing" element={<PostListing />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
