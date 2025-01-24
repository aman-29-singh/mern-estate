import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js'//import this and add .js after controller
import { verifyToken } from '../utils/verifyUser.js';

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
userRouter.post('/update/:id', verifyToken, updateUser);//ye updateUser() function user.controller.js mein likha hua hai
/*so we have function updateUser() but updating a User is not like a signingUp or signingIn we have an extra
checking what we need to check is to check if the person i.e User is authenticated or not so when we SigningIn
the User then we create a token inside a cookie and now we can use that token to verify the User so that we know 
which User we are updating so that if we are updating the wrong User and that User is not authenticated then
they should get an error so we gonna create another function called verifytoken() and then before going to
update the User i.e before updateUser() function we gonna check User is verified or not with the help of
verifytoken() function so inside the utils folder we already have an error.js file so we gonna create another
file called verifyUser.js  */
userRouter.delete('/delete/:id', verifyToken, deleteUser);//here id is params

export default userRouter;