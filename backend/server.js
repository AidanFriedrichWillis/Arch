//SERVER,INDEX FOR SET UP CONNECTIONS


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

//CREATING THE SOCKET SERVER FOR THE CHAT FUNTION
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//USING CORS AS A SAFTY MIDDLEWARE
app.use(cors());

//STARTING THE CONNECTION WITH THE SOCKET(CHAT SYSTEM)
io.on("connection", (socket) => {
  socket.on("sendMessage", (message, callback) => {
    const returnmes =
      message.rank + " " + message.username + ": " + message.message;
    io.emit("message", returnmes);
  });
});
//DEFINING THE PORT NUMBER
const port = 5000;

app.use(express.json());
//STARTING THE DATABASE COMMUNICATION
const uri = "mongodb://localhost:27017/users";
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//STARTING MY ROUTER COMMUINICATIONS
const usersRouter2 = require("./routes/users.routes");
const booksRouter2 = require("./routes/books.routes");
app.use("/users", usersRouter2);
app.use("/Books", booksRouter2);
//SERVER LISTENING ON THE PORT 
server.listen(port, () =>
  console.log(`Server has started.`)
);
module.exports = server;
