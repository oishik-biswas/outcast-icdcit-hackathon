import userModel from '../models/user.model.js';
import userService from "../services/user.service.js";
import {validationResult} from "express-validator";

let userController = {};
userController.register = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()});
        }
        const {fullName, email, password} = req.body;
        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.create({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email: email,
            password: hashedPassword,
        })

        console.log(user);
        const token = user.generateToken();
        res.status(200).send({user, token});
    } catch (error) {
        return res.status(400).send({errors: "Email already exists"});
    }
}

userController.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('password email fullName');
    console.log(user);
    if (!user) {
        return res.status(401).json({message: 'Invalid user or password'});
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid user or password'});
    }

    const token = user.generateToken();
    res.status(200).send({user, token});
}

userController.logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

userController.updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

userController.checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export default userController;
