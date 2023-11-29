const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
// Add express
const app = express();
// Port setup
const PORT = process.env.PORT || 8000;
// Connect to database
connectDB();
// CORS usage
app.use(cors());
// middleware usage
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the support desk" });
});

// Routes
app.use("/api/users", require("./routes/userRoute"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
