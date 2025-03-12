const Cart = require('../model/cartModel'); 
const Product = require('../model/productModel'); 

// Add an item to the cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cartItem = await Cart.findOne({ user: req.user.id, product: productId });

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new Cart({ user: req.user.id, product: productId, quantity });
        }

        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all cart items for a user
const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user.id }).populate('product', 'name price image');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        let cartItem = await Cart.findOne({ _id: req.params.id, user: req.user.id });
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Clear the entire cart
const clearCart = async (req, res) => {
    try {
        await Cart.deleteMany({ user: req.user.id });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { addToCart, getCart, updateCartItem, removeFromCart, clearCart };
