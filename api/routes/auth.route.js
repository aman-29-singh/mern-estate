import express from 'express';
import { google, signin,signup ,signOut} from '../controllers/auth.controller.js';

const authRouter = express.Router();

/*we gonna create sign-up route in these we gonna do to take user information about username,email,password
from client  side which is browser and then we gonna change the password hash the password and save it inside 
the database*/
authRouter.post('/signup')
//and this signup() function we gonna create inside controllers fiolder i.e inside auth.controller.js file

authRouter.post("/signup",signup)//here /signup is url and 2nd parameter signup is function of auth.controller.js
authRouter.post("/signin",signin);
authRouter.post('/google', google);//for google authentication
authRouter.get('/signout', signOut);

export default authRouter;//this authRouter will import in main index.js
