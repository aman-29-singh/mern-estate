import express from 'express';
import { test } from '../controllers/user.controller.js'//import this and add .js after controller

const userRouter = express.Router();

/*
userRouter.get('/test',(req,res)=>{
    res.json({message:'Hello world'})
});

/*putting logic like thsi is not also a good practice i.e we need to put this logic  even inside a separate
folder so we gonna create another separate folder inside an api and this folder is going to be controllers
because we call this logic and functions as a controllers and inside a controllers folder we gonna create
file called user.controller.js  and inside this file we gonna write and export function const test and this 
test() function is going to return same res.json({"hello world"}) and we gonna use this test() function
inside thius user.route.js file of routes folder */

userRouter.get('/test',test);

export default userRouter;