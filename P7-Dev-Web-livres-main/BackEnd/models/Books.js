const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },  
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: { type: [{ userId: String, grade: Number }], default: [] },  
  averageRating: { type: Number, default: 0 },  
});

module.exports = mongoose.model("Book", bookSchema); 