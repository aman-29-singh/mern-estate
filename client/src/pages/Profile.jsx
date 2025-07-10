import { useSelector } from "react-redux"
import { useRef, useState } from 'react'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice"//we import this
import { useDispatch } from "react-redux"; //import this
import { Link, Links } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)//currentUser means jis user ne abhi just sign-in kiya h
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch(); //intialise the dispatch for to use in catch(error) block
  const [updateSuccess, setUpdateSuccess] = useState(false);
  //console.log(FormData)
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);//for show Listings in UI
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);//once everything is ok then it is
    } catch (error) {
      /*Inside this we gonna dispatch the error if you are remember we had use dispatch in signIn page
      but in profile.jsx we don't have any Reducers so we need to go to redux folder then we go to user
      then we go to userSlice.js then inside userSlice.js we gonna add three more Reducers for our updateUser*/
      dispatch(updateUserFailure(error.message))

    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      /*now inside the catch we wanna dispatch the error so we need to create actually the Reducers
      i.e the Reducers are like deleteUserStart, deleteUserSuccess, deleteUserFailure from redux
      of user folder i.e inside the userSlice.js file of a client */
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () => {

    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');//here we goona request to /signout of backend i.e this may be frontend-backend connection
      //and we not gonna send anything to backend so POST method is not required so by default we have get Method

      const data = await res.json();//here we gonna convert the response to json
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));//this will delete the User i.e signOut the user
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));

    }
  }


  //when we click on show Listings button in profile then this works
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);//if everythings is ok

    } catch (error) {
      setShowListingsError(true);
    }
  }

  const handleListingDelete = async (listingId) => {//this listingId we get an as a Input
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      //if the Delete is suucessful the we will use setUserListings
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">{/*maximum width in laptop screen is large lg mx-auto se center hoga */}
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">{/*flex in column direction in vertical direction */}
        <input type='file' ref={fileRef} hidden accept="image/*" />{/*isse image par click karne se file explorer open hoga to select image */}
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt='profile'
          className="rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-2" onChange={handleChange} />
        <input type="text" placeholder="username" id='username' defaultValue={currentUser.username}
          className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" placeholder="email" id='email' defaultValue={currentUser.email}
          className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="password" id='password'
          className="border p-3 rounded-lg" onChange={handleChange} />

        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95
        disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>

        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}>
          Create Listing
        </Link>

      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5"> {updateSuccess ? 'user is updated successfully!' : ''}</p>
      <button onClick={handleShowListings} className="text-gray-700 w-full"> Show Listings</button>

      <p className="text-red-700 mt-5">{showListingsError ? 'Error showing listings' : ''}</p>

      {userListings && userListings.length > 0 &&
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>


          {userListings.map((listing) => (
            <div key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover"
                  className="h-16 w-16 object-contain " />
              </Link>

              <Link className='text-slate-700 font-semibold flex-1 hover:underline truncate'
                to={`/listing/${listing._id}`}>
                <p>
                  {listing.name}
                </p>
              </Link>

              <div className="flex flex-col items-center">
                <button onClick={() => handleListingDelete(listing._id)} className="text-red-700 uppercase">Delete</button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>


            </div>))}
        </div>}
    </div>
  )
}
