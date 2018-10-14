const mongoose = require('mongoose');
const Product = require('./product-model');
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
	name: String,
  productId: [{type: Schema.Types.ObjectId, ref: 'Product'}],
	review: String
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);
