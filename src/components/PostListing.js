import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import axios from 'axios';

const PostListing = () => {
  const [formData, setFormData] = useState({
    id: Date.now(), // Generate a unique `id`
    title: '',
    description: '',
    price: '',
    location: '',
    category: '',
    image: [],
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // For success alert
  const navigate = useNavigate(); // Use for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim())
      newErrors.description = 'Description is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      newErrors.price = 'Please enter a valid price';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.category.trim())
      newErrors.category = 'Please select a category';
    if (!formData.image)
      newErrors.image = 'Please upload an image';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate fields
      if (!formData.title || !formData.description || !formData.price || !formData.category || !formData.image) {
        setMessage('All fields are required.');
        return;
      }
  
      // Create form data for multipart upload
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('location', formData.location);
      data.append('category', formData.category);
      data.append('image', formData.image); // Attach the image file
      data.append('id', formData.id); 
  
      try {
        const response = await axios.post('http://localhost:5000/listings', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data.success) {
          setMessage('Listing posted successfully!');
          setSuccess(true); // Set success to true
          setTimeout(() => navigate('/'), 2000); // Redirect to homepage after 2 seconds
        } else {
          setMessage(response.data.message || 'Failed to post listing.');
        }
      } catch (error) {
        console.error('Error posting listing:', error);
        setMessage('An error occurred while posting the listing.');
      }
    };


  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Post a New Listing</h2>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Listing posted successfully. Redirecting...</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2"
             placeholder="Enter the category"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="Enter the price"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="Enter the location"
            required
          />
        </div>
        <div className="flex flex-col sm:col-span-2">
          <label className="mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2"
            placeholder="Enter a description"
        rows="4"
            required
          />
        </div>
       
       
       
        <div className="flex flex-col sm:col-span-2">
          <label className="mb-2 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border rounded-md p-2"
          />
        </div>
        <div className="sm:col-span-2 text-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-900 ">
            Post Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostListing;

