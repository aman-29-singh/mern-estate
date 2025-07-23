import React, { useEffect, useState } from 'react'
/*This paage has two part the search side information form and also the Listing Result side and in mobile
display we see tis two both part on top of each other wher in laptop screen we see both of them next to each other */
import { useNavigate } from 'react-router-dom'
export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState(
        {
            //this is initial value of state
            searchTerm: '',
            type: 'all',
            parking: false,
            furnished: false,
            offer: false,
            sort: 'created_at',
            order: 'desc',
        }
    )

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        //once we get all of them tghen we check
        if (
            //any of them is changes
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }



        /*so we have actually all the information so based on the information we have  we wanna fetch data from a database
         and show the result  in Right sside of Listing results: section */
        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);//use api from backend i.e controller.js
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }

        fetchListings();

    }, [location.search]);//so  by using this useEffect if we search in searchForm then the same changes occured in URL and searchTerm of leftSide form



    console.log(sidebardata);
    //now we wanna change the browser URL based on these information i.e console.log(sidebardata) of handleChange when we click on button search
    //so after clicking on search buttton i wanna submit this left side form of search page and change the url of browser
    const handleChange = (e) => {
        /*there are some conditions because the inputs are different sometimes the input is boolean,
        sometimes the input is text and sometimes it has a vaalue like rent */
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({ ...sidebardata, type: e.target.id })
            //i.e we keep the previous information and then we change the type for example the type can be all,can be rent or sele

        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value })
            //we keep the previous information and then searchTerm is going to be e.target.value
        }


        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }


        if (e.target.id === 'sort_order') {

            const sort = e.target.value.split('_')[0] || 'created_at'

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({ ...sidebardata, sort, order });//i.e we added sort and order
        }
    };

    //this will handleSubmit of form
    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('type', sidebardata.type)
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('offer', sidebardata.offer)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
        const searchQuery = urlParams.toString()//WE HAVE created a search Ouery of browser
        navigate(`/search?${searchQuery}`)//i.e navigate the user to this searchQuery by /search
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>{/*This div is for left side of page there is form in these left side*/}
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox'
                                id='all'
                                className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'} //that's why Type is checked i.e tick by default
                            />
                            <span>Rent & Sale</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}//that is rent box par checked rahega agar agar sidebardata.type === 'rent' rahega
                            />
                            <span>Rent </span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.offer}//that is if it is true then box is checked
                            />
                            <span>Offer</span>
                        </div>

                    </div>


                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>

                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5'
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished </span>
                        </div>

                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select
                            onChange={handleChange}
                            defaultValue={'created_at_desc'}
                            id='sort_order'
                            className='border rounded-lg p-3'>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>

            <div className=''>{/*this is Right side of a page where we have a listing Results*/}
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
            </div>
        </div>
    )
}
