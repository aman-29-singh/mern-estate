import { errorHandler } from "../utils/error.js";//here we must ensure the extension .js i.e error.js
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";//in models we have to add .js in last
import Listing from "../models/listing.model.js";


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


export const getUserListings = async (req, res, next) => {
    /*so first of all we are going to check that if someone is authenticated it must get only his own listing 
    they cannot get listing of other people i.e we check that person is real owner of that perticular id listing */
    if(req.user.id === req.params.id){
        /*here req.user.id this we get from cookie i.e from jwt is equal to browser k params mein jo :id hoga
        i.e/listings/:id ismein ka id equal hoga cookie k id  se jo humein authentication k time par jwt se mila
        tha then it is valid persons id then we wanna return the data otherwise we wanna send an error using -> next */
        try{
            const listings = await Listing.find({ userRef: req.params.id})//Listing we import from listing.model.js
            //it will find just the listing that have userRef of /listings/:id of this id
            res.status(200).json(listings);//we will return this listings in json
        } catch (error) {
            next(error)
        }
    }else{
        return next (errorHandler(401, 'You can only view your own listings! '))
    }

}