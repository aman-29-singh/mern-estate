import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;//because you remember inside the cookie we have put the name of the token to is access_token
    // so once we get the token we can verify the User

    if(!token) return next(errorHandler(401, 'Unauthorized'));//if there is No token then this error
    //here next is middleware and errorHandler is function in error.js file of utils folder


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403,'Forbidden'));

       req.user = user;
       next(); 
    })
}