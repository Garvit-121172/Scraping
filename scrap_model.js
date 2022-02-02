const mongoose = require("mongoose");

const scrapSchema = mongoose.Schema(
  {
    question: {
      type: String,
      //later convert to array
    },
    link: {
      type: String,
    },
    views: {
      type: Number,
    },
    votes: {
      type: Number,
    },
    answer: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("scrap", scrapSchema);
