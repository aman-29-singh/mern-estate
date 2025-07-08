import {FaSearch} from 'react-icons/fa' //install from terminal react  Faicons
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';//we import this

export default function Header() {
    const { currentUser } = useSelector(state => state.user)//we intialise this
    return (
        <header className='bg-slate-200 shadow-md '>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex'>
                    <span className='text-slate-500'>vishal&yash</span>
                    <span className='text-slate-700'>estate</span>
                </h1>
                </Link>


                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input type="text" placeholder='search...'
                    className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600'/>
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

