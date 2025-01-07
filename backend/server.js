const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require("./db");
const Listing = require('./models/listing'); // Import the Listing model
const mongoose = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Connect to MongoDB Atlas
connectDB();
console.log('Cloudinary API Key:', process.env.CLOUDINARY_API_SECRET); // Outputs your Cloudinary cloud name

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'damis', // Replace with your Cloudinary cloud name
  api_key: "213384824962858",       // Replace with your API key
  api_secret: 'MZ0cpvj9mhPs8oCI0nfy5Fje0NQ', // Replace with your API secret
});


// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'marketplace-images', // Folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({  dest: 'uploads/',storage });


// Routes
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.get('/listings', async (req, res) => {
    try {
      const listings = await Listing.find().sort({ createdAt: -1 }); // Assuming `Listing` is your model
      res.status(200).json(listings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching listings.' });
    }
  });
  
  app.get('/listings/:id', async (req, res) => {
    try {
      const product = await Listing.findOne({ id: req.params.id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the product.' });
    }
  });
  
 // Upload route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    const folder = 'listings';

     // Generate signature
     const signature = crypto
     .createHash('sha1')
     .update(`folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
     .digest('hex');

        // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folder,
      timestamp: timestamp,
      signature: signature,
      api_key: process.env.CLOUDINARY_API_KEY,
    });


    // Send back a proper JSON response
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message,
    });
  }
});


  
 
  // Route to create a new listing
  
app.post("/listings", upload.single("image"), async (req, res) => {
 
  try {


 // Upload image to Cloudinary
 const result = await cloudinary.uploader.upload(req.file.path, {
   folder: "listings",
 });
 //console.log("Cloudinary Upload Result:", result);

    // Create a new listing object
    const newListing = new Listing({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      category: req.body.category,
      image: result.secure_url, // Save the uploaded image URL
    });

    // Save to database
    await newListing.save();

    res.status(201).json({
       success: true,
        listing: newListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating listing" });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

