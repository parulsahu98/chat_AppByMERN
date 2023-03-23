const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroom = require("../controllers/chatroomController");

const auth = require("../middlewares/auth");

router.get("/", auth, catchErrors(chatroom.getAllChatrooms));
router.post("/", auth, catchErrors(chatroom.createChatroom));

module.exports = router;
