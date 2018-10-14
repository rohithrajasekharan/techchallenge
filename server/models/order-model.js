const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product-model');

const OrderSchema = mongoose.Schema({
	productId: {type: Schema.Types.ObjectId, ref: 'Product'},
  userId: String,
	quantity: Number,
  redeemed: Boolean
});

const Order = module.exports = mongoose.model('Order', OrderSchema);
