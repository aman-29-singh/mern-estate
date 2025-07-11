// this page is for specific id individual listing
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';//this is for image
import SwiperCore from 'Swiper';
import {Navigation } from 'swiper/modules'//because we wanna add navigation between different images
import 'swiper/css/bundle';

export default function Listing () {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
    useEffect(()=> {
        const fetchListing = async () => {
            try{
                const res = await fetch(`/api/listing/get/${params.listingId}`)//as we define in app.jsx i.e/listing/:listingId
            const data = await res.json();//convert it into json
            if(data.success === false){
                setError(true);
                setLoading(false);
                return;
            }

            //if we successful then
            setListing(data)
            setLoading(false)//when we get data then we set loading to false
            setError(false)//if everything is ok

            } catch(error) {
                setError(true);
                setLoading(false);
            }
            
        }

        fetchListing();
    },[params.listingId])
  return  <main>
    {loading && <p className='text-center my-7 text-2xl'>loading...</p> }
    {error && <p className='text-center my-7 text-2xl'>Something went wrong</p> } {/*if there is an error we want to see error as well */}

    {/*Now i wanna show image at the top using Swiper library  which we install on client side */}
    {listing && !loading && !error && 
    <div>
        <Swiper>
            {listing.imageUrls.map((url) => <SwiperSlide key={url}>
                <div className='h-[550px]' style={{background: `url(${url}) center no-repeat`}}></div>
            </SwiperSlide>)}
        </Swiper>
    </div>
        }
    </main>
  
}
