import userModel from "../models/user.model.js";

let userService ={};
userService.create = async ({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password) {
        throw new Error("All fields are required");
    }

    return await userModel.create({
        fullName: {
            firstName: firstName,
            lastName: lastName,
        },
        email,
        password,
    });
}

export default userService;