const mongoose = require('mongoose');
const Store = require('./store-model');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
	name: String,
  company: [{type: Schema.Types.ObjectId, ref: 'Store'}],
	price: Number,
	description: String,
	image: String,
  offer: String
});

const Product = module.exports = mongoose.model('product', ProductSchema);
