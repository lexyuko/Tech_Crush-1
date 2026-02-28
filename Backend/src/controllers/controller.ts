import bcrypt from "bcryptjs";
import {User} from "../models/user.model";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies";
import { Request, Response } from "express";
export const signup = async (req: Request, res: Response) => {
    
    const { userName, email, password } = req.body || {};
    try{
        //sign up logic
        if (!email || !password || !userName) {
          res.status(400).json({ success: false, message: "All fields required" });
    }
    const userAlreadyExists = await User.findOne({email}); // Replace with actual check
    if (userAlreadyExists) {
    return res.status(400).json({success: false, message: "User already exists" });
}
const hashedPassword = await bcrypt.hash(password, 10); // Replace with actual hashing
const verificationToken = Math.floor(100000 + Math.random() * 900000).toString() // Replace with actual token generation logic
const user = new User({
    email: email,
    password: hashedPassword,
    userName: userName,
    verificationTokenExpiresAt: Date.now()  +24 * 60 * 60 * 1000, // Token expires in 24 hours
})
await user.save(); // Replace with actual save logic
//jwt
generateTokenAndSetCookie(res, user.id);// Replace with actual token generation and cookie setting logic

res.status(201).json({
    success: true,
     message: "user registered successfully",
    user:{
        ...user.toObject(),
        password: undefined,
    }
})
}catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred during signup";
    return res.status(500).json({success: false, message: message });
};
} 

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //login logic
    try{
         const user = await User.findOne({ email }); // Replace with actual user lookup logic
    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
const isPasswordValid = await bcrypt.compare(password, user.password); // Replace with actual password comparison logic
 if(!isPasswordValid){
    return res.status(400).json({ success: false, message: "Invalid email or password" });
 }
generateTokenAndSetCookie(res, user.id);
user.lastlogin = new Date();
await user.save();
res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user: {
        ...user.toObject(), 
        password: undefined,
    },
});
}catch (error) {
    console.log("login Error:", error);
    res.status(400).json({ success: false, message: "An error occured during login" });
};
}

export const logout = (req: Request, res: Response) => {  
    res.clearCookie("token"); // Clear the authentication token cookie
    res.status(200).json({ success: true, message: "Logged out successfully" }); 

}
