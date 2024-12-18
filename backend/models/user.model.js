import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 10
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 20
    },
    password : {
        type: String,
        required: true,
        minLength: 6
    },
    image : {
        type:  String,
        default: ""
    },
    searchHistory: {
        type: Array,
        default: []
    }
});

export const User = mongoose.model('User', userSchema);