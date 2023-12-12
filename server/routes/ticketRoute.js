const express = require("express");
const { protect } = require("../middleware/authorizationMiddleware");
const { getTickets, createTickets } = require("../controller/ticketController");
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTickets);

module.exports = router;
