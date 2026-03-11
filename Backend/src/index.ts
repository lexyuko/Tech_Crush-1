import express from "express";
import  { configDotenv } from "dotenv";
import connectDB from "./db/db";
import app from "./app";

configDotenv({ path: "./.env" });

const port = process.env.PORT || 5000;



// Middleware to parse JSON bodies



connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }) 
//   console.log("Connected to MongoDB");
}) 
.catch((error) => {
    console.log("Failed to connect to MongoDB:", error.message);
});
