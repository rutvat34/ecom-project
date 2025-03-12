const Wishlist = require('../model/wishlistModel');
const Product = require('../model/productModel');

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is already in the wishlist
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // If the product is already in the wishlist, skip adding it
    if (wishlist.products.some(item => item.product.toString() === productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

// Get all products in the user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

// Remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(item => item.product.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};

// Update a product's details in the wishlist (if needed)
const updateWishlistProduct = async (req, res) => {
  try {
    const { productId, newDetails } = req.body;
    const userId = req.user.id;

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Find the product in the wishlist
    const wishlistProduct = wishlist.products.find(item => item.product.toString() === productId);
    if (!wishlistProduct) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    // Update product details (if required)
    wishlistProduct.details = newDetails; // Add new details if required (e.g., quantity, notes)
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error updating wishlist', error: error.message });
  }
};

module.exports = { addToWishlist, getWishlist, removeFromWishlist, updateWishlistProduct };
