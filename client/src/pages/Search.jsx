import React from 'react'
/*This paage has two part the search side information form and also the Listing Result side and in mobile
display we see tis two both part on top of each other wher in laptop screen we see both of them next to each other */

export default function Search () {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>{/*This div is for left side of page there is form in these left side*/}
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text'
                    id='searchTerm'
                    placeholder='Search...'
                    className='border rounded-lg p-3 w-full'/>
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className=''/>
                        <span>Rent & Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className=''/>
                        <span>Rent </span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className=''/>
                        <span>Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className=''/>
                        <span>Offer</span>
                    </div>

                </div>


                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className=''/>
                        <span>Parking</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className=''/>
                        <span>Furnished </span>
                    </div>

                </div>

                <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id='sort_order'
                        className='border rounded-lg p-3'>
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>

        <div className=''>{/*this is Right side of a page where we have a listing Results*/}
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
        </div>
    </div>
  )
}
