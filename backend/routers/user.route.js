import express from 'express';
import {body} from 'express-validator';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", [
    body("email").isEmail().withMessage("Email is invalid"),
    body("fullName.firstName").isLength({min: 3}).withMessage("First must be at least 3 characters"),
    body("password").isLength({
        min: 6,
        max: 11
    }).withMessage("Passwords must be at least 6 characters adn at most 11 characters long"),
],userController.register);

router.post("/login", [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").isLength({
        min: 6,
        max: 11
    }).withMessage("Passwords must be at least 6 characters adn at most 11 characters long"),
], userController.login);

export default router;