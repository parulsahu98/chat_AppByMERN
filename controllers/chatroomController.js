const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const { promisify } = require('util');

const client = require("../redis");


const GET_ASYNC = promisify(client.get).bind(client)
const SET_ASYNC = promisify(client.set).bind(client)
exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};

exports.getAllChatrooms = async (req, res) => {

  const reply = await GET_ASYNC('chatrooms')
  if (reply) {
    console.log('using cached data')
    res.json(JSON.parse(reply))
    return
  }
  const chatrooms = await Chatroom.find({});
  const saveResult = await SET_ASYNC(
    'chatrooms',
    JSON.stringify(chatrooms),
    'EX',
    5
  )
  console.log('new data cached', saveResult)
  res.json(chatrooms);
};

