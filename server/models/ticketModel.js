const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select the product"],
      enum: ["iphone", "pixel", "samsung", "oneplus"],
    },
    descripstion: {
      type: String,
      required: [true, "Please add ticket description"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
