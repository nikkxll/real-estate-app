import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";

dotenv.config();
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to database');
    }).catch((e) => {
        console.log(e);
    })

const app = express()

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.use('/api/user', userRouter)
