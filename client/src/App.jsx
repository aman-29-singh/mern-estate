import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
export default function App() {
  return (
    <BrowserRouter>  {/*for this tag we have to install react-router-dom from terminal*/}
      <Header></Header>  {/*isse Header all pages mein rahega*/}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />}/>{/*this page is not private i.e this page shows for individual specific listing Id */}

        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} /> {/*this is a private page because user must authenticated to see this page */}
          <Route path='/create-listing' element={<CreateListing />} /> {/*element mein actual page aayega */}
          <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          {/*it shows update page  based onn this Id i.e  listingId */} 

          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
