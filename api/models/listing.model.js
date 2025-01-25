import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        //this is an object of Rules for creating List
        name:{
            type: String,
            required: true,

        },
        description:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        regularPrice:{
            type: Number,
            required: true,
        },
        discountPrice:{
            type: Number,
            required: true,
        },
        bathrooms:{
            type: Number,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        furnished:{
            type: Boolean,
            required: true,
        },
        parking:{
            type: Boolean,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        offer:{
            type: Boolean,
            required: true,
        },
        imageUrls:{//we gonna save the images inside the database i.e the Url of them
            type: Array,//Array because it has more than one image
            required: true,
        },
        userRef:{//we wanna know the which user created this listing
            type: String,
            required: true,
        },
    }, {timestamps: true}//we wanna save the time of creation and updates so we gonna add timestamps true
)

//Now after creating Schemas we gonna create the model
const Listing = mongoose.model('Listing', listingSchema);//this listingSchema we had created above

export default Listing