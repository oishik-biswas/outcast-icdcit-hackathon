import express from 'express';
import {body} from 'express-validator';
import userController from '../controllers/user.controller.js';
import {protectRoute} from "../middleware/user.middleware.js";

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

router.post("/logout", userController.logout);
router.put("/update-profile", protectRoute, userController.updateProfile);
router.get("/check", protectRoute, userController.checkAuth);

export default router;



// import express from "express";
// import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
//
// const router = express.Router();
//
// router.post("/register",[
//     body("email").isEmail().withMessage("Email is invalid"),
//     body("fullName.firstName").isLength({min: 3}).withMessage("First must be at least 3 characters"),
//     body("password").isLength({
//         min: 6,
//         max: 11
//     }).withMessage("Passwords must be at least 6 characters adn at most 11 characters long"),
// ], signup);
//
// router.post("/login", [
//     body("email").isEmail().withMessage("Email is invalid"),
//     body("password").isLength({
//         min: 6,
//         max: 11
//     }).withMessage("Passwords must be at least 6 characters adn at most 11 characters long"),
// ], login);
// router.post("/logout", logout);
//
// router.put("/update-profile", protectRoute, updateProfile);
//
// router.get("/check", protectRoute, checkAuth);
//
// export default router;
