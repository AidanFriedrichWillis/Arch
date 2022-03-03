const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());//midbtw
app.use(express.json());

const uri = "mongodb://localhost:27017/users";
mongoose.connect(uri
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/Books');

app.use('/users', usersRouter);
app.use('/Books', booksRouter);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
