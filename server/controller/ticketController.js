const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// access private
const getTickets = expressAsyncHandler(async (req, res) => {
  // Get user by ID
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.find({ user: req.user.id });
  res.status(200).json(ticket);
});

// @desc Create user tickets
// @route POST /api/tickets
// access private
const createTickets = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("Bad Request");
  }

  // Get user by ID
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  createTickets,
};
