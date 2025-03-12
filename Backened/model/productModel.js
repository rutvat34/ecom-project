const mongoose = require('mongoose');

//schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId,
    ref:"Category"
   },
  imageUrl: { type: String },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
