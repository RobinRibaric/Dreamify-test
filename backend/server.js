const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

// Initialize the app
const app = express();

//Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to db
connectDB();

// CORS
app.use(cors());

// Route files
const auth = require("./routes/auth");

// Body-parser
app.use(express.json());

// Mount routers
app.use("/api/v1/auth", auth);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.MODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  //Close server and exit process
  server.close(() => process.exit(1));
});
