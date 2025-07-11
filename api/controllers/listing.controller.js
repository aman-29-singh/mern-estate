import Listing from "../models/listing.model.js";//import from model and .js at end
import { errorHandler } from "../utils/error.js";

export const createListing = async(req, res, next) => {
   /*here this async means asynchronous because we have to wait for response of mongodb and we gonna use 
    next() middleware to handle Error*/
    try{
        const listing = await Listing.create(req.body)//req.body is information we get from browser
        return res.status(201).json(listing);//this listing is created in json form with response 201 means something created
    } catch (error){
        next(error);
    }

}

export const deleteListing = async (req, res, next) => {
    //first we will check if listing is exist or not
    const listing = await Listing.findById(req.params.id);//find this listing id in database
    
    //if listing is not exist
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }

    //if listing exist then we wanna check if the user is the owner of listing
    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401,'you can only delete your own listing!'));
    }

    //but if everything is ok then we will use try and catch
    //and Inside the try we just want to delete the user
    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');//aise server Response bhejega json mein

    } catch (error) {
        next(error);
    }
}

//this is for  edit the individual listing
export const updateListing = async (req, res, next)=> {
    //first we will check if listing is exist or not\
    const listing = await Listing.findById(req.params.id);
    if(!listing) {
        return next(errorHandler(404, 'Listiing not found'));
    }

    //now  we will  check that wheather the listing is belong to that person in req.params.id
    if(req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'you can only update your own listings!'));
    }

    //otherwise we will update the person listing
    try{
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);

    } catch(error) {
        next(error);
    }
}

export const getListing = async (req, res, next) => {
    try{
      const listing = await Listing.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }

      res.status(200).json(listing);
    } catch(error) {
        next(error)//it is middleware to catch the error
    }
}