const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors()); //midbtw
app.use(express.json());

const uri = "mongodb://localhost:27017/users";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
const usersRouter2 = require("./routes/users.routes");
const booksRouter2 = require("./routes/books.routes");

app.use("/users", usersRouter2);
app.use("/Books", booksRouter2);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
