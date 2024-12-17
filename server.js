const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/databaseConnection");
const UserRoutes = require("./routes/user.routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());

app.use("/api/user", UserRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB ${err}`);
    process.exit(1);
  });
//
