const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    lastname: {
        type: String,
        required: [true, "Please provide a last name"]
    },
    middlename: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"] 
    },
    state: {
        type: String,
        required: [true, "Please provide a state"]
    },
    position: {
        type: String,
        required: [true, "Please provide a position you are aspiring for!"]
    },
    party: {
        type: String,
        required: [true, "You must belong to a political party"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password for your account"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);

module.exports = User;