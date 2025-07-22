import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) { //we get this listing as a prop from Listing.jsx FROM <Contactt/>
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');
    const onChange = (e) => {
        setMessage(e.target.value)
    }
    //this useEffect is goping to run only one time when the component contact.jsx is called or shown in the page
    useEffect(()=> {
        
        const fetchLandlord = async () => {
            try{
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);

            } catch(error) {
                console.log(error)
            }
        }
        fetchLandlord();//call tthe function so this is goning to get the Landlord informartion an d we will show this below in return secttion
    
    },[listing.userRef])
  return (
    <>
        {/*if there is a landlord then we wanna show this thing */}
        {landlord && (
         <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for 
            <span className='font-semibold'>{listing.name.toLowerCase}</span></p> {/*so we get a landlord by fetching the data above and then we show the landlord username */}
            <textarea name="message" id='message' rows="2" value={message} onChange={onChange}
            placeholder='Enter your message here...' 
            className='w-full border p-3 rounded-lg '>
             
            </textarea>

            <Link to={`mailto:${landlord.email}?subject=Regardingv ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
              Send Message
            </Link>
         </div>
        )}
    </>
    //i wanna actually get the information of user i.e landlord se we need to create an Api route for for fething the information of a user
    //but for doing that you need to be authenticated

  )
}
