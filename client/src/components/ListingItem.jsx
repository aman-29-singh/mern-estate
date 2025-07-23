import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn} from 'react-icons/md';
export default function ListingItem({ listing }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='' 
                className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' 
                />
                <div className='p-3 flex flex-col gap-2 w-full0'>
                    <p className='truncate text-lg font-semibold'>{listing.name}</p>
                    <div className='flex items-center gap-1'>
                        <MdLocationOn className='h-4 w-4 text-green-700'/> {/*Location wala icon aayega */}
                        <p className='text-sm text-grey-600 truncate w-full'>{listing.address}</p>
                    </div>
                    <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
                    {/*yeh clamp-2 k wajah se agar big description hoga toh two line k baad aisa ... aayega */}

                    <p className='text-slate-500 mt-2 font-semibold '>
                        $
                        {listing.offer ?
                         listing.discountPrice.toLocaleString('en-us')  : //ye tolLocaleString se 50000 k bich mein , comma aayega like 50,000
                         listing.regularPrice.toLocaleString('en-us')}
                        {listing.type === 'rent' && ' /month'}
                    </p>

                    <div className='text-slate-700 flex gap-4'>
                        <div className='font-bold text-xs'>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link> {/*this link we used on card so anywhere on card we click then we go to that listing */}
        </div>
    )
}
