const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const colors = require("colors");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/.env" });

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(mongoSanitize());
app.use(helmet());
const limitter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
});
app.use(limitter);
app.use(hpp());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  compression({
    level: 6,
  })
);

//Routes
app.use("/api/v1/books", require("./routes/comicbooks.route"));

app.all("*", async (req, res, next) => {
  try {
    return res.status(404).json({
      success: false,
      message: "Error 404: Not Found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

//ErrorHandler Middleware

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.NODE_ENV} on port @${PORT} 🚀`.yellow
      .bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.error(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
