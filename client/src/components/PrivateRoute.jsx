import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
export default function PrivateRoute() {
    
    const {currentUser} = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to= '/sign-in' />
}

/*with this if user want to access the profile page directly with /profile in browser then it will deny 
the request and user will automatically come to sign-in page and if user sign-in properly then only
the user can see the profile page */
