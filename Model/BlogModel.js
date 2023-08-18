const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Plaese Enter Your Blog Title"],
    maxLength: [150, "Title Cannot be exceed 150 chracter"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, "Plaese Enter Your Blog Category"],
  },
  BlogImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

const BlogModel = mongoose.model("blog", BlogSchema);
module.exports = BlogModel;
