const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.MONGO_URI}/dealsdrayTask`)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => console.error(error));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", require("./routes/UserRoute.js"));
app.use("/api/employees", require("./routes/EmployeeRoute.js"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serer is listening on port ${PORT}`));
