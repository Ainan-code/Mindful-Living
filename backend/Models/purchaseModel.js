const mongoose = require('mongoose');


const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  date: { type: Date, default: Date.now },

  amount: { type: Number, required: true },

  category: { type: String, enum: ['Need', 'Want', 'Impulse'], required: true },

  itemName: { type: String, required: true },

  notes: { type: String },

  paymentMethod: { type: String, enum: ['Credit Card', 'Debit Card', 'Cash',] },
});





module.exports = mongoose.model("Purchase", purchaseSchema);

