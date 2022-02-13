const ChatRoom = require('../models/chatRoom')
const Chat = require('../models/chats')
const User = require('../models/user')
exports.createRoom = async (req, res) => {
    const { name } = req.body

    try{
        const roomCreated = await ChatRoom.create({
            name: name
        })
        
        return res.json({
            status: 'ok',
            msg: 'Room Created Successfully',
            room: roomCreated
        })
    } catch(e) {
        if (e.code === 11000) {
            return res.json({
                status: "error",
                msg: "This room name already exists",
            });
        }
        throw e;
    }

    
}

// todo : check if user already present then return a resp accordingly
exports.addMember = async (req, res) => {
    const { userId, roomId } = req.body

    const room = await ChatRoom.findOne({_id: roomId})
    room.userIds.addToSet(userId)

    const user = await User.findOne({_id: userId})
    user.rooms.addToSet(roomId)

    await user.save()
    await room.save()

    return res.json({
        status: 'ok',
        msg: 'Member added successfully',
        room: room
    })
}


// todo : check if user is already removed then return a resp accordingly
exports.removeMember = async (req, res) => {
    const { userId, roomId } = req.body

    const room = await ChatRoom.findOne({_id: roomId})
    room.userIds.pull(userId)

    const user = await User.findOne({_id: userId})
    user.rooms.pull(roomId)

    await user.save()
    await room.save()

    return res.json({
        status: 'ok',
        msg: 'Member removed successfully',
        room: room
    })
}




exports.getAllChats = async (req, res) => {
    const { roomId } = req.query

    try{
        const room = await ChatRoom.findOne({_id: roomId}).populate('chats')
        return res.json({
            status: 'ok',
            msg: 'received all the chats for this room',
            chats: room.chats
        })

        

    } catch (e) {
        console.log(e)
        return res.json({
            status: 'error',
            msg: e
        })
    }
}


exports.getRoom = async (req, res) => {
    try {
        const room = await ChatRoom.findById(req.params.id)
        return res.json({
            status: 'ok',
            room: room
        })
        
    } catch (err) {
        res.status(500).json({
            status: "error",
            msg: err
        })
    }
}