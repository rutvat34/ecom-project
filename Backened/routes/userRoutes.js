const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Protect middleware for authentication

const router = express.Router();

// User Registration Route
router.post('/register', registerUser);  // Register a new user

// User Login Route
router.post('/login', loginUser);        // Login an existing user

// Get User Profile (Protected Route)
router.get('/profile', protect, getUserProfile);  // Fetch user profile, authentication required

// Get User by ID (Protected Route)
router.get('/user/:id', protect, getUserById);  // Fetch user by ID, authentication required

// Create New User (Protected Route)
router.post('/user', protect, createUser);  // Admin can create a new user, authentication required

// Update User by ID (Protected Route)
router.patch('/user/:id', protect, updateUser);  // Update user info by ID, authentication required

// Delete User by ID (Protected Route)
router.delete('/user/:id', protect, deleteUser);  // Admin can delete a user by ID, authentication required
module.exports = router;




