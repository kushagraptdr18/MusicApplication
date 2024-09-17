const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Define the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
    // match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    // match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePhoto: {
    data: Buffer,
    contentType: String,
  },
  playlist: [{}],
  favoriteSongs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song' // Reference to Song model
  }],
}, { timestamps: true });

module.exports = model('User', userSchema);
