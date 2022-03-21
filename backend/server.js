const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require('http');
const chatRouter = require("./routes/chat.routes");


const app = express();





const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server (server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(chatRouter);

io.on("connection", (socket) => {
  socket.on("sendMessage", (message, callback) => {
    const returnmes = message.rank + " " + message.username+ ": " +message.message
    io.emit('message', returnmes)
  });

  // socket.on("disconnect", () => {
  //   const user = removeUser(socket.id);

  //   if (user) {
  //     io.to(user.room).emit("message", {
  //       user: "Admin",
  //       text: `${user.name} has left.`,
  //     });
  //     io.to(user.room).emit("roomData", {
  //       room: user.room,
  //       users: getUsersInRoom(user.room),
  //     });
  //   }
  // });
});



const port = 5000;


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




server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
module.exports = server;
