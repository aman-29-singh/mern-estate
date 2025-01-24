import { errorHandler } from "../utils/error.js";//here we must ensure the extension .js i.e error.js
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";//in models we have to add .js in last


export const test = (req, res) => {
    res.json({
        message: 'Api Route is working',
    })
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "you can only update your own account"))
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
        },
        { new: true }
    );

        const { password, ...rest } = updatedUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async(req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401,'you can only delete your own account!'))
    
    try{
      await User.findByIdAndDelete(req.params.id)//we will use params to delete that User
      res.clearCookie('access_token');//we have to delete the cookie also of currentUser check in application
      res.status(200).json('user has been deleted');
    } catch (error) {
        next(error)
    }
}

