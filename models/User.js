const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    userId: String, //googleId or facebookId
    username: String,
    picture: String
})

mongoose.model("users", userSchema)