import express from 'express';
import userRouter from './routes/userRoutes.js';
import noteRoute from './routes/noteRoutes.js' ;
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

app.use(express.json())

dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    app.listen(3000, () => {
        console.log('server is running on port number 3000');
    })
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
    res.json({
        message: "hellow form server"
    })
})

app.use("/user", userRouter);

app.use('/note', noteRoute)



