const express = require('express');
const { 
    addToCart, 
    getCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart 
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Cart CRUD Operations
router.route('/')
    .post(protect, addToCart)   // Add item to cart
    .get(protect, getCart)      // Get all cart items for a user
    .delete(protect, clearCart); // Clear entire cart

router.route('/:id')
    .patch(protect, updateCartItem)  // Update cart item (e.g., quantity)
    .delete(protect, removeFromCart); // Remove item from cart

module.exports = router;
