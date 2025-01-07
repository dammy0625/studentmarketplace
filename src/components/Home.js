import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListingCard from './ListingCard';
const Home = () => {
  // Sample data for listings
  const [listings, setListings] = useState([]);
  

  useEffect(() => {
      axios.get('http://localhost:5000/listings')
          .then(//response => setListings(response.data)
            (response) => {
              const now = new Date();
              const updatedListings = response.data.map((listing) => {
                const createdAt = new Date(listing.createdAt);
                const isNew = (now - createdAt) / (1000 * 60 * 60 * 24) <= 7; // Check if within 7 days
                return { ...listing, isNew };
              });
              setListings(updatedListings);
            }
          )


          .catch(error => console.error(error));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          id={listing.id}
          title={listing.title}
          price={Number(listing.price)}
          location={listing.location}
          image={listing.image}
          isNew={listing.isNew}
          
        />
      ))}
    </div>
  );
};

export default Home;

