const mongoose = require("mongoose");
const ratingeSchema = new mongoose.Schema(
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
module.exports = mongoose.model("Ratinge", ratingeSchema, "Ratinge");