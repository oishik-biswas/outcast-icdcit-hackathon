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

export default userController;
