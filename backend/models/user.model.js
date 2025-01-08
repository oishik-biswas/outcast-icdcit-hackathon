import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName : {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters"],
        },
        lastName : {
            type: String,
            minlength: [3, "First name must be at least 3 characters"],
        }
    },
    email: {
        type: String,
        required: true,
        unique : true,
        minLength: [5, "Email must be at least 5 characters"],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: String,

}, { timestamps: true })

userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

export default userModel;