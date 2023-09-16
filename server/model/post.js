import mongoose from "mongoose";

const postSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,

    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now(),
        required: true
    },

});

const post = mongoose.model('post', postSchema);

export default post;
