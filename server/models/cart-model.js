const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product-model');

const CartSchema = mongoose.Schema({
	productId: {type: Schema.Types.ObjectId, ref: 'Product'},
  userId: String,
	quantity: Number
});

const Cart = module.exports = mongoose.model('Cart', CartSchema);
