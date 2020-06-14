const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    join: {
        type: Number,
        ref: 'JoinProject'
    }

}, { timestamps: true })


const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }
