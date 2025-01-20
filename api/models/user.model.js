import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{  //for Google Authentication
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    },
},{ timestamps:true });//it will tell two extra information 1 is time of creation and 2 is time of update of user

const User = mongoose.model('User',userSchema);//it is name of model i.e User jo userSchema se bana hai
//mongodb will automatically convert this User model into users model Mongodb mein dekh sakte hai

export default User;