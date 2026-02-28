import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookie = (res : Response, userID : string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret){
        throw new Error("JWT secret is not defined in environment variables");
    }
    const token = jwt.sign({ userID },
        secret,
         { expiresIn: "1h" });

         res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000, // 7 days
});
return token;
};