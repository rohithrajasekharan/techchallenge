const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = mongoose.Schema({
	name: String,
  location: String
});

const Store = module.exports = mongoose.model('store', StoreSchema);
