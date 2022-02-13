const Notification = require('../models/notification')

exports.clearAll = async (req, res) => {
    try{
        const notification = await Notification.findOneAndUpdate({userId: req.user._id}, {$set: {notifications: [], count: 0}})
        
        return res.json({
            status: 'ok',
            notification: notification
        })
    } catch(e) {
        return res.json({
            status: 'error',
            msg: e
        })
    }
}

exports.getAll = async (req, res) => {
    try{
        const notification = await Notification.findOne({userId: req.user._id})

        return res.json({
            status: 'ok',
            notification: notification
        })
    } catch(e) {
        return res.json({
            status: 'error',
            msg: e
        })
    }

}