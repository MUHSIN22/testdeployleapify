const express = require("express");
const { createRoom, addMember, removeMember, getAllChats, getRoom } = require("../controllers/chatRoom");
const router = new express.Router();


router.post('/create', createRoom)
router.post('/add', addMember)
router.post('/remove', removeMember)
router.get('/chats', getAllChats)
router.get('/:id', getRoom)

module.exports = router;