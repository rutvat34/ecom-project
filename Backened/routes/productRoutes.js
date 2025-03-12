const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

const router = express.Router();

router.route('/')
    .post(createProduct)  // Create a product 
    .get(getAllProducts); // Get all products 

router.route('/:id')
    .get(getProductById)  // Get a product by ID 
    .patch(updateProduct) // Update a product 
    .delete(deleteProduct); // Delete a product 

module.exports = router;
