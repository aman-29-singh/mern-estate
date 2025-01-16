import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';//we have to import this to use process.env.MONGO
import userRouter from './routes/user.route.js';//yahan par route.js insert karna hai
dotenv.config();

//to use .env file we have to install npm install .env in ter minal of mern-estate
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to Mongodb ");
})
    .catch((err) => {
        console.log(err);
    })

const app = express();

app.listen(3000, () => {
    console.log('server is running on port 3000!')
})

/*
app.get('/test',(req,res)=>{ //this is api route here request from client and response is from server
    res.send('Hello world')
}
);

/*but this is not best practice for creating Api Route because we cannot create all Api route like 
sign-in,sign-up,profile etc here inside the index.js file because then this index.js file gonna be lon
file so the best practice is to create Separate folder for Api Routes and also this functions like app.get()
for example inside backend i.e inside api we gonna crteate create separate folder called routes and inside
this routes folder we gonna create our first route just for users i.e file user.route.js in inside routes folder
*/

app.use("/api/user",userRouter); //we use this test api from user.route.js file of routes folder
//to get response from server we have to write in browser localhost:3000/api/user/test