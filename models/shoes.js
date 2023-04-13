const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoeSchema = new Schema({
  shoesID: String,
  section_name: { type: String, unique: true }
});

module.exports = mongoose.model('Shoe', shoeSchema);
