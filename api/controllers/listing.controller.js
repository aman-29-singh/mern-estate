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

export const getListings = async (req, res, next ) => {
    //first we write in try catch because of possible errors
    try{
        /*we wanna create the request but we wanna search inside the listing but before wanna limit the page
        because we wanna need a pagination we wanna add the limit we wanna have an start index because we wanna 
        known which page we are in and also we wanna get the offer, parking, type etc when we click on offer
        than w only get an listing of page that had an offer and in url also offer is true when we click on
        offer in page so we should have an ability to do all this thing by just one api route  so we wanna
        create only one api route to be able to do all this thing */
        const limit = parseInt(req.query.limit) || 9;//like /api/listing/get?limit=2 so this is ging to req.quer.limit
        //so we wanna say it if there is limit use it parse it and make it number otherwise use 9 means 9 listing page dikhegi
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if(furnished === undefined || furnished === 'false') {
            furnished ={ $in: [false, true] };
        }

         /*ye code se form mein agar parking,furnished etc ye sab mein se kisi par bhi tick karenge toh 
         browser k URL mein ye furnished , parking etc ye sab true ho jayega  */
        let parking = req.query.parking;

        if( parking === undefined || parking === 'false') {
            parking ={ $in: [false, true] };
        }


        let type = req.query.type;

        if( type === undefined || type === 'false') {
            type ={ $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            //regx is built in search functtionality for mongodb suppose name is modern and if we search de than it search modern as well 
            name: { $regex : searchTerm, $options: 'i'},//here options means don't care about upperCase and lowerCase in search
            offer,
            furnished,
            parking,
            type,// search for all this
        }).sort(
            {[sort]: order}
        ).limit(limit).skip(startIndex)//if starting index is 0 they are gonna start from begining but if startingIndex is 1 than it skips the first of 9 for us


        return res.status(200).json(listings);

    } catch(error){
        next(error);
    }
}