const express = require('express');
const { addOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');  // Ensure proper import from controller
const { protect } = require('../middleware/authMiddleware'); // Ensure middleware is used for authentication

const router = express.Router();

// Add Order Route
router.post('/', protect, addOrder);  // Route to add an order

// Get Order by ID
router.get('/:id', protect, getOrderById);  // Route to get order by ID

// Update Order by ID (PATCH)
router.patch('/:id', protect, updateOrder);  // Ensure updateOrder is defined in your controller

// Delete Order by ID
router.delete('/:id', protect, deleteOrder);  // Route to delete order by ID

module.exports = router;
