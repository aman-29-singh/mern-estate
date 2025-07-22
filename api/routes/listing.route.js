import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';//yeh .js extension use karna mandotory hai
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createListing)//we wanna check if the person is authenticated or not
//so that the person is not able to crete any listing if person is not authenticated so we have
//we have to verify the user and then create the listing
router.delete('/delete/:id', verifyToken, deleteListing)

router.post('/update/:id', verifyToken, updateListing);//its for editing an individual listing
/*we gonna go to /update and we gonna pass the params of /:id ,and we gonna verify the Token so we 
get to know that the person is authenticated or not and then we gonna call a function call updateListing 
from listing.controller.js*/
router.get('/get/:id', getListing);//this getListing function we import from listing.controller..js

router.get('/get', getListings);//this is not protected everybody can searh it even without authentication
//here in Listings we do not pass any :id because we want more than one listing that's why its Listings
//getListings we import from controller


export default router;