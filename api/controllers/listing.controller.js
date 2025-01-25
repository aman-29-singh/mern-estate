import Listing from "../models/listing.model.js";//import from model and .js at end

export const createListing = async(req, res, next) => {
   /*here this async means asynchronous because we have to wait for response of mongodb and we gonna use 
    next() middleware to handle Error*/
    try{
        const listing = await Listing.create(req.body)//req.body is information we get from browser
        return res.status(201).json(listing);//this listing is created in json form with response 201 means something created
    } catch (error){

    }

}