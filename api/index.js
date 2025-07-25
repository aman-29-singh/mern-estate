import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';//we have to import this to use process.env.MONGO
import userRouter from './routes/user.route.js';//yahan par route.js insert karna hai
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';//install in client terminal/ npm i cookie-parser
import path from 'path';
dotenv.config();




//to use .env file we have to install npm install .env in ter minal of mern-estate
mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to Mongodb ");
})
    .catch((err) => {
        console.log(err);
    })


    const __dirname = path.resolve();

const app = express();

//by default we are not allowed to send any json to the server so we need to allow json as the input
app.use(express.json());//this will allow json as input of the server
/*so isse jab insomania api testing se jab json mein data send karenge server mein toh woh data server par dikhega
but actually this is not what we want to do we wanna save this data inside a database so inside auth.controller.js
we willuse destructuring i.e const {username,email,password} = req.body then will store this information inside
database using model that we had already created  so this coding will done in inside auth.controller.js file*/

app.use(cookieParser());//initialise this now you can get the information from cookie

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

app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);//so we need to create this route in our application


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
})


app.use((err,req, res, next)=> { //this is a Middleware to handle Error
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
   })
})