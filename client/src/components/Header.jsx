import {FaSearch} from 'react-icons/fa' //install from terminal react  Faicons
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';//we import this
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser } = useSelector(state => state.user)//we intialise this
    const [ searchTerm, setSearchTerm ] = useState('');//initial value is empty string  this is for search form in header i. NavBar
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);//isse jo bhi search karenge woh URL mein as a Params pass hojayega
        const searchQuery = urlParams.toString();//convertt this urlParams into String because some of them are numbers and some of other things
        navigate(`/search?${searchQuery}`);//navigate to this url
    }
  //now we will use useEffect because we want thatt when each time this searchTerm= ''changes we want to change
     useEffect(()=> {
        const urlParams = new URLSearchParams(window.location.search);//we get this search
        const searchTermFromUrl = urlParams.get('searchTerm');//so we get this searchTerm
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
            /*so isse agar hum browser k url mein searhTerm= key k andar kuch likhenge toh woh Header k search form mein 
            reflect i.e dikhega aur agar hum search form mein kuch likhenge toh ye browser k URL mein reflect i.e dikhega
            so ye Header k search form ko aur browse k URL ko interactive banata hai aur agar URL mein offer wagera add
            karenge true false karenge toh ye change nhi hoga*/
        }
     },[location.search])

    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex'>
                    <span className='text-slate-500'>vishal&yash</span>
                    <span className='text-slate-700'>estate</span>
                </h1>
                </Link>


                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='search...'
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}//means woh search form mein Header k jo likhenge woh value
                     />
                    <button>
                        <FaSearch className='text-slate-600'/> {/*this search icon is button click on icon to perform onSubmit() */}
                    </button>
                </form>
                
                
                <ul className='flex gap-4'>
                    <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>

                    <Link to='about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>
                    
                    <Link to='/profile'>{/*isse image par click karne se /profile page par jayenge */}
                    {currentUser ? (
                        <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar}
                         alt='profile'/>
                    ): (
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>
                    )}

                    </Link>
                </ul>
            </div>
        </header>
    )
}

