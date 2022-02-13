const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type:String,
        required: true,
    },
    username: {
       type: String,
    },
    type : {
        type: String
    },
    roomId: {
        type: Schema.Types.ObjectId,
        ref: 'ChatRoom'
    },
    imageUrl: [{
        type: String,
    }],
    comments: [{
        comment: String,
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }],
    reports: [{
        comment: String,
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postedOn: {
            type: Date
        }
    }],
    likes: {
        type: Array,
        default: []
    },
    reactions: [{
        type: String
    }]
}, {timestamps: true});

const model = mongoose.model('Chat', chatSchema);

module.exports = model
