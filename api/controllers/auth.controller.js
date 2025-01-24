import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';//for importing this first in root terminal we have to install bcryptjs
import { errorHandler } from '../utils/error.js';//import this to throw or handle the error in catch{}
//i.e npm install bcryptjs ye password ko hashed kar dega jise password secure hoga
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{ //we pass next as parameter to middleware ko chalane k liye
    //we want information from browser information like username,email,password
    //this information i.e user information comes from body i.e req.body is the information we get from browser

    //console.log(req.body);
    /*so we gonna see this req.bdy but in the browser as we don't have now any form so client or we cannot 
    send any data so what we need to do is to use an api test software we have plenty of software like
    postman,insomania etc but for this project we will use insomania api test */

    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);//from bcryptjs
    const newUser = new User({username,email,password:hashedPassword});
    
    try {
        await newUser.save();//this is going to save inside a database
    //with await the code is going to stay in this line until this save operation finishes 

    res.status(201).json('user created successfully');//lets check in insomania api after sending
    //in insomania after send the json to server this will print
    //now check database i.e in atlas database check browse collection mein ban gya hoga

    } catch (error) {
       // res.status(500).json(error.message);//isse error insomania api mein dikhega server mein nahi

       next(error);//we just say next to  use the middleware and we pass this error that we catch 

      //next(errorHandler(550,'error from the function'))//this is import from utils folder and error.js file
      //here 550 is statusCode and 'error from t5he function' is the message

    }


}


export const signin = async(req,res,next) => {//signin willtake req,res,next as parameter
  const { email, password } = req.body;//this will take request from user i.e frontend & store in email & pass
  try{
    /*what we gonna do with this email and password that 1st we gonna check that this email is exist in 
    database or not with the help of validUser*/
    const validUser = await User.findOne({email});//User model k help se mongodb mein find karenge ye email ko
    if (!validUser) return next(errorHandler(404,'User not found'));//if email not exist in mongodb then this error

    const validPassword = bcryptjs.compareSync(password,validUser.password);
    /*i.e with the help of bcryptjs we will comapre the password jo req.body se aaraha hai with the password
    of validUser jiska password pehle se mongodb database mein store hai */

    if(!validPassword) return next(errorHandler(401,'Wrong credentials!')); //next() is middleware

    /*so if we assure that both email and password are correct then we need to authenticate the user
    now the way we do the authentication is to add the cookies inside the browser and we need to 
    create a hashtoken that includes the email of the user or the Id of the User and then we save this
    token inside the browser cookie So each time when the User wanna do some changes like its email password
    and any crucial information so we need to check the User is auntenticated or not so we can use that
    cookie to do that But we not gonna save the data as it is we gonna hashed the data as well
    So the best package for doing that is jwt i.e (json web token) we can use this package to create
    the token with these we can create the hash values of the Users So in terminal in root directory
    i.e mern-estate is root directory iske andar we install jsonwebtoken i.e npm i jsonwebtoken
    and at top of this file we will import jwt from 'jsonwebtoken';   */
    const token = jwt.sign({ id: validUser._id},process.env.JWT_SECRET)//creation of token
    const { password: pass, ...rest } = validUser._doc;//password na dikhe in insomania iske liye
    
    //now after creation of token we want to save this token as a cookie
    res.cookie('access_token',token,{ httpOnly:true }).status(200).json(rest);
    //cookie ka naam hai access_token yeh api testing insomania mein bhi dikh jayega



  }catch (error){
    next(error);//it is middleware to catch error this miidleware we had created in index.js file i.e 500code
  }
};


export const google = async (req, res, next) => {
  try{
    const user = await User.findOne({ email: req.body.email })
    if(user) {//if user exist in database we just wanna authenticate the user and make signIn the user
      const token = jwt.sign({ id: user._id },process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
         .cookie('access_token', token, { httpOnly:true})
         .status(200)
         .json(rest);
    } else{/*agar user exist nhi karta then we wanna create the user but if you remember inside the model
      ii.e inside the user.model.js the password is actually required but for sigining up with Google 
      we don't actually get any password from Google so if we do that i.e if we signup the user then we get
      an error because the password is required so we need to actually create a password we need to generate
      the password like an random password and later if user want they can update an password themselve
       */ 
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().
        toString(36).slice(-4), email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      //yeh req.body.name ye frontend se aaraha hai inspect mein user se iska code humne kiya hai
      
      await newUser.save();
      const token = jwt.sign({ id: newUser._id}, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token',token, { httpOnly: true}).status(200).json(rest);
    }
  }catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) =>{
  try{
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error){
    next(error);
  }
};