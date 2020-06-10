const mongoose = require('mongoose');
const Schema = mongoose.Schema


const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    title : {
        type:String,
        maxlength: 50
    },
    description : {
        type:String
    },
    privacy: {
        type: Number
    },
    category: {
        type: Number
    },
    views: {
        type: Number,
        default: 0
    },
    filePath : {
        type: String,
    },
    people: {
        type: Number
    },
    startday: {
        type: Date
    },
    daycount: {
        type: Number
    }
}, {timestamps: true})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }