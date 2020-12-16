const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBookSchema = new Schema({
  title: {
    type:String, 
    required: true
  },
  author: {
    type:String,
    required: true
  },
  description: {
    type: String,
  },
  image: {
    type:String,
  },
  link: {
    type: String,
  }

});
const Books = mongoose.model("Books", googleBookSchema);

module.exports = Books;
