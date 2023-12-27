const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

const getTickets = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).send("User Not Found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

const createTicket = expressAsyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    return res.status(400).send("Bad Request");
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).send("User Not Found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});

const getTicket = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).send("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).send("Ticket not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    return res.status(401).send("Not authorized");
  }

  res.status(200).json(ticket);
});

const deleteTicket = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).send("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).send("Ticket not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    return res.status(401).send("Not authorized");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

const updateTicket = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).send("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.status(404).send("Ticket not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    return res.status(401).send("Not authorized");
  }

  const allowedFields = ["product", "description"]; // Add other allowed fields
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  updateTicket,
  deleteTicket,
};
