import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';//yeh .js extension use karna mandotory hai
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create',verifyToken, createListing)//we wanna check if the person is authenticated or not
//so that the person is not able to crete any listing if person is not authenticated so we have
//we have to verify the user and then create the listing
router.delete('/delete/:id', verifyToken, deleteListing)

export default router;