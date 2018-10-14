const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = mongoose.Schema({
	name: { type: String },
  location: { type: String, text: true }
});

const Store = module.exports = mongoose.model('Store', StoreSchema);
