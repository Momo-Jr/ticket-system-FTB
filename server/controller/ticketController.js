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
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
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

// @desc Get user ticket
// @route GET /api/tickets/:id
// access private
const getTicket = expressAsyncHandler(async (req, res) => {
  // Get user by ID
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  res.status(200).json(ticket);
});

// @desc DELETE user ticket
// @route DELETE /api/tickets/:id
// access private
const deleteTicket = expressAsyncHandler(async (req, res) => {
  // Get user by ID
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }
  await ticket.remove();
  res.status(200).json({ success: true });
});

// @desc update user ticket
// @route PUT /api/tickets/:id
// access private
const updateTicket = expressAsyncHandler(async (req, res) => {
  // Get user by ID
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not Found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
