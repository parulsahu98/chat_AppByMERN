const express = require("express");

const responseTime =require( 'response-time');
const { promisify } = require('util')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("cors")());
app.use(responseTime())

app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));


const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
