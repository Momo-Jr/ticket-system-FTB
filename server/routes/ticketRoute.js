const express = require("express");
const { protect } = require("../middleware/authorizationMiddleware");
const {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controller/ticketController");
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTickets);
router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
