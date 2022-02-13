const mongoose = require("mongoose");

// FeedBack JsonMembers

const FeedbackSchema = new mongoose.Schema({
    p_email: { type: String},
    d_email: { type: String},
    d_name: { type: String},
    p_name: { type: String},
    date: { type: String},
    status: { type: String},
    rating: { type: String},
    message : { type: String}
})


// We Will Create a New mongoose.Collection
const FeedBack = new mongoose.model('FeedBack', FeedbackSchema);
module.exports = FeedBack;
