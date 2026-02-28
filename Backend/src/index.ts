// import express, { Request, Response, NextFunction } from 'express';
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.json({ message: 'Hello World!' });
// });



// app.get("/user/:id", (req: Request, res: Response) => {
//   const {id} = req.params;
//   res.json({ userId: id });
// });
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
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
