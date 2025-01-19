import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function SignIn() {
  //we want to create a piece of state which keep track of all changes so we use4 useState formData
  const [formData, setFormData] = useState({});//formData is object and we change this object using setformData

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();//this is for navigation

  const handleChange = (e) => {
    setFormData( //it is a function 
      {
        ...formData,//this keep previous information and ... this is spread operator
        [e.target.id]: e.target.value,//whatever is changing in id of form set that one to its value
      }
    );
  };

  const handleSubmit = async (e) => { //this e is event of eventHandler onSubmit i.e onSubmit is eventhandler
    e.preventDefault()//it prevents Refreshing the page whwn we submit the form
    try{

      setLoading(true);//before request to server loading dikhega
    const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log(data);
     if(data.success === false){ //after request to server
      
      
       setLoading(false);
       setError(data.message);
       return;
     }

     

      setLoading(false);
      setError(null);
      navigate('/');//when user created then it navigate to sign-in page
      

    }catch(error) {
      setLoading(false);
      setError(error.message);
    }
    
    

    
      
  };
    
  
  //console.log(formData);//this will show all previous value of form in console of inspect
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95
         disabled:opacity-80' onChange={handleChange}>
          { loading ? 'Loading...' : 'Sign In'}
          </button> {/*agar btn par click hoga toh btn par dikhega Loading otherwise btn par Sign Up dikhega*/}
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
