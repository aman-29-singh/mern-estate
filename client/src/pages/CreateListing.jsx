import React, { useState } from 'react';
import { userRef } from 'react';
import {useSelector} from 'react-redux'//import this it helps to know which is current user
import {useNavigate} from 'react-router-dom'
export default function CreateListing() {

  const {currentUser} = useSelector(state => state.user)//define useSelector
  const [files, setFiles] = useState([]); // To store selected files
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    //uploadedImageUrls: [],
    //uploadedImages:[],
    imageUrls:[],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  
  
  console.log(formData);

  // Function to handle file upload to Cloudinary
  const handleFileUpload = async (files) => {
    //const uploadedImageUrls = [];
    const imageUrls = [];
    
    for (const file of files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'First_time_using_cloudinary'); // Your Cloudinary preset
      data.append('cloud_name', 'dtlfnvlqy'); // Your Cloudinary cloud name

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dtlfnvlqy/image/upload', {
          method: 'POST',
          body: data,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const uploadImageURL = await res.json();
        console.log('Full Cloudinary response:', uploadImageURL);
        
        if (uploadImageURL.secure_url) {
          imageUrls.push(uploadImageURL.secure_url);//
          console.log('Uploaded image URL:', uploadImageURL.secure_url);
        } else if (uploadImageURL.url) {
          imageUrls.push(uploadImageURL.url);//
          console.log('Uploaded image URL:', uploadImageURL.url);
        } else {
          console.error('Upload failed - no URL in response:', uploadImageURL);
          throw new Error(uploadImageURL.error?.message || 'Upload failed');
        }
        
      } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error; // Re-throw to handle in calling function
      }
    }

    return imageUrls;//
  };

  // Function to handle image upload (separate from listing creation)
  const handleImageUpload = async () => {
    if (!files || files.length === 0) {
      setError('Please select at least one image.');
      return;
    }

    if (files.length > 6) {
      setError('You can only upload maximum 6 images');
      return;
    }

    setImageUploading(true);
    setError(false);

    try {
      console.log('Starting upload for files:', files);
      const imageUrls = await handleFileUpload(files);//
      console.log('Upload completed, URLs received:', imageUrls);//
      
      if (imageUrls.length > 0) {//
        // Combine with existing uploaded images
        const allUploadedImages = [...uploadedImages, ...imageUrls];//
        setUploadedImages(allUploadedImages);
        
        // Update formData with uploaded image URLs
        setFormData(prev => ({
          ...prev,
          imageUrls: allUploadedImages//
        }));
        
        console.log('Updated uploadedImages state:', allUploadedImages);
        setError(false);
      } else {
        setError('No images were uploaded successfully. Please try again.');
      }
      
    } catch (error) {
      console.error('Error during upload:', error);
      setError(`Error uploading images: ${error.message}`);
    }

    setImageUploading(false);
  };

  // Function to remove an uploaded image
  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = uploadedImages.filter((_, index) => index !== indexToRemove);
    setUploadedImages(updatedImages);
    setFormData({
      ...formData,
      imageUrls: updatedImages//
    });
  };

  const handleChange = (event) => {
    if (event.target.id === 'sale' || event.target.id === 'rent') {
      setFormData({
        ...formData,
        type: event.target.id
      });
    }

    if (event.target.id === 'parking' || event.target.id === 'furnished' || event.target.id === 'offer') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked
      });
    }

    if (event.target.type === 'number' || event.target.type === 'text' || event.target.type === 'textarea') {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submission started');
    console.log('Current formData:', formData);
    
    // Validation
    if (formData.imageUrls.length === 0) {//
      setError('Please upload at least one image');
      return;
    }

    if (formData.offer && +formData.discountPrice >= +formData.regularPrice) {
      setError('Discount price must be lower than regular price');
      return;
    }

    // Basic field validation
    if (!formData.name || !formData.description || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price')


    try {
      setLoading(true);
      setError(false);
      
      console.log('Sending request to API...');
      
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,//it is important it helps to known which is current user
        }),
      });

      //console.log('Response status:', res.status);
      //console.log('Response headers:', res.headers);


      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Response data:', data);
      
      if (data.success === false) {
        setError(data.message || 'Failed to create listing');
        setLoading(false);
        return;
      }

      navigate(`/listing/${data._id}`)//it will navigate the user to its id page
      
      // Success handling
      alert('Listing created successfully!');
      console.log('Listing created successfully:', data);
      
      // Optional: Reset form
      setFormData({
        //uploadedImageUrls: [],
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
        parking: false,
        furnished: false,
      });
      setUploadedImages([]);
      
    } catch (error) {
      console.error('Submission error:', error);
      setError(`Error creating listing: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>

        <div className='flex flex-col gap-4 flex-1'>
          <input 
            type="text"
            placeholder='Name' 
            className='border p-3 rounded-lg' 
            id="name" 
            maxLength='62' 
            minLength='10' 
            required
            onChange={handleChange}
            value={formData.name}
          />
          
          <textarea 
            placeholder='Description'
            className='border p-3 rounded-lg'
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          
          <input 
            type="text"
            placeholder='Address'
            className='border p-3 rounded-lg'
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='sale' 
                className='w-5' 
                onChange={handleChange}
                checked={formData.type === 'sale'} 
              />
              <span>Sell</span>
            </div>

            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='rent' 
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'} 
              />
              <span>Rent</span>
            </div>

            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='parking' 
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>

            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='furnished' 
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='offer' 
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms} 
              />
              <p>Beds</p>
            </div>

            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}   
              />
              <p>Baths</p>
            </div>

            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='regularPrice'
                min='50'
                max='1000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>

            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input 
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>
            Images:
            <span className='font-normal text-gray-600 ml-2'>
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className='flex gap-4'>
            <input 
              onChange={(e) => setFiles(e.target.files)} 
              className='p-3 border border-gray-300 rounded w-full' 
              type="file" 
              id="images" 
              accept='image/*' 
              multiple 
            />
            <button 
              type="button" 
              disabled={imageUploading} 
              onClick={handleImageUpload} 
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {imageUploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {formData.imageUrls.length > 0 && (//  uploadedImages
            <div className="mt-4">
              <p className='text-green-700 text-sm mb-2'>
                {formData.imageUrls.length} image(s) uploaded successfully!
              </p>
              <div className="flex gap-4 flex-wrap">
                {formData.imageUrls.map((url, index) => ( //
                  <div key={url} className="relative">
                    <img 
                      src={url} 
                      alt={`Listing ${index + 1}`} 
                      className="w-20 h-20 object-cover rounded-lg border-2 border-green-500" 
                      onError={(e) => {
                        console.error('Image failed to load:', url);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => console.log('Image loaded successfully:', url)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Debug: {formData.imageUrls.length} URLs in state
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Create Listing'}
          </button>
          
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}