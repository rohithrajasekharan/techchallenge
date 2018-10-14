const mongoose = require('mongoose');
const Store = require('./store-model');
const Schema = mongoose.Schema;

const ProductSchema = mongoose.Schema({
	name: String,
  companyId: [{type: Schema.Types.ObjectId, ref: 'Store'}],
	price: Number,
	description: String,
	image: String,
  offer: String,
	points: Number
});

const Product = module.exports = mongoose.model('Product', ProductSchema);
