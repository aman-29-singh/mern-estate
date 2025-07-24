// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import {Swiper, SwiperSlide} from 'swiper/react';
// import 'swiper/css/bundle';
// //import {Navigation} from 'swiper/modules';
// //import SwiperCore from 'swiper';
// import CustomCarousel from './Caraousel';
// import ListingItem from '../components/ListingItem';


// export default function Home() {
//   const [offerListings, setOfferListings] = useState([]);
//   const [saleListings, setSaleListings] = useState([]);
//   const [rentListings, setRentListings] = useState([]);
//   //SwiperCore.use([Navigation]);
//   console.log(saleListings);
//   useEffect(()=> {
//     const fetchOfferListings = async () => {
//       try{
//         const res = await fetch('/api/listing/get?offer=true&limit=4');
//         const data = await res.json();//convert the response data into json
//         setOfferListings(data);//so isse offerListings mein data i.e server se bheja hua response ka data aajayega in offerListings state mein
        
//         fetchRentListings();//so until the response of fetchOfferListings not come we didn't call this function of Rent
//       } catch (error) {
//         console.log(error)
//         //ye errror sirf console mein dihega yeh error user i.e client ko nhi dihega because state i.e useState ka use nhi kiye error dikhane k liye

//       }

//       const fetchRentListings = async () => {
//         try{
//         const res = await fetch('/api/listing/get?type=rent&limit=4');
//         const data = await res.json();//convert the response data into json
        
//         setRentListings(data);//so isse RentListings mein data i.e server se bheja hua response ka data aajayega in rentListings state mein
        
//         fetchSaleListings();//so until the response of fetchRentListings not come we didn't call this function of Sale
//       } catch (error) {
//         console.log(error)
//         //ye errror sirf console mein dihega yeh error user i.e client ko nhi dihega because state i.e useState ka use nhi kiye error dikhane k liye

//       }
//       }
//       const fetchSaleListings = async () => {
//         try{
//           const res = await fetch('/api/listing/get?type=sale&limit=4');
//           const data = await res.json();
//           setSaleListings(data);
//         } catch (error) {
//           console.log(error)
//         }
//       }
//       fetchOfferListings();
//     }
//   }, []);


//   return (
//     <div>
//       {/*divide Home page into 3 part 1)Top this is a top is a title section */}
//       <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
//         <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
//           Find your next<span className='text-slate-500'>perfect</span>
//           <br/>
//           place with ease
//         </h1>
//         <div className='text-gray-400 text-xs sm:text-sm'>
//           Aman Estate is the best place to find your next perfect place to live.
//           <br/>
//           we have a wide range of properties for you to choose from.
//         </div>
//         <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
//           Let's get started...
//         </Link>
//       </div>




//       {/*Swiper section i.e middle section */}
//       {/*here for Swiper we don't have any static image so we wanna use images of an Recent offer so the last 4 offer */}
//       {/*so first we wanna fetch data for offers and also we wanna fetch the data for rent and sale its similar like searchTerm */}
//       {/*so here we will add 3 pieces of states for listing i.e offerListings, saleListings, rentListings */}

        


//     {/*listing results for offer, sale and rent */}
    
//     <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
//         {offerListings && offerListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {offerListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {rentListings && rentListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {rentListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//         {saleListings && saleListings.length > 0 && (
//           <div className=''>
//             <div className='my-3'>
//               <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
//               <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
//             </div>
//             <div className='flex flex-wrap gap-4'>
//               {saleListings.map((listing) => (
//                 <ListingItem listing={listing} key={listing._id} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CustomCarousel from './Caraousel'
import ListingItem from '../components/ListingItem'

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }

      const fetchRentListings = async () => {
        try {
          const res = await fetch('/api/listing/get?type=rent&limit=4');
          const data = await res.json();
          setRentListings(data);
          fetchSaleListings();
        } catch (error) {
          console.log(error);
        }
      }

      const fetchSaleListings = async () => {
        try {
          const res = await fetch('/api/listing/get?type=sale&limit=4');
          const data = await res.json();
          setSaleListings(data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchOfferListings();
  }, []);


  console.log(rentListings);
  console.log(saleListings);
  return (
    <div>
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Aman Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started...
        </Link>
      </div>

      {/*  Render Carousel Here */}
      <CustomCarousel offerListings={offerListings} />

      {/* Listing Sections */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* Offers */}
        {offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
       
       <div>
        {/* Sale */}
        {saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
