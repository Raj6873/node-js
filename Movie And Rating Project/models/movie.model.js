const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    Admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admins",
    },
    title: String,
    content: String,
    image: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("movie", movieSchema, "movie");