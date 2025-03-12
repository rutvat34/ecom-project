const express = require('express');
const { addToWishlist, getWishlist, removeFromWishlist, updateWishlistProduct } = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a product to the wishlist
router.post('/', protect, addToWishlist);  // Protect ensures only authenticated users can access this route

// Get all products in the user's wishlist
router.get('/', protect, getWishlist);  // Protected route

// Remove a product from the wishlist
router.delete('/', protect, removeFromWishlist);  // Protect ensures only authenticated users can access this route

// Update a product's details in the wishlist
router.patch('/', protect, updateWishlistProduct);  // Protected route

module.exports = router;
