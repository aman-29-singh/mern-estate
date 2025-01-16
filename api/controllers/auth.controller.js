import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';//for importing this first in root terminal we have to install bcryptjs
//i.e npm install bcryptjs ye password ko hashed kar dega jise password secure hoga


export const signup = async (req,res)=>{
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

    } catch (error) {
        res.status(500).json(error.message);//isse error insomania api mein dikhega server mein nahi

    }

    res.status(201).json('user created successfully');//lets check in insomania api after sending
    //in insomania after send the json to server this will print
    //now check database i.e in atlas database check browse collection mein ban gya hoga
}