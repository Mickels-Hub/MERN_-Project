import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams(); // Added to catch listingId from URL

const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 35000,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    landlordName: '',
    landlordPhone: '',
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // PUT THE useEffect HERE (After all states are declared)
  useEffect(() => {
    const fetchListing = async () => {
      if (params.listingId) {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setFormData(data);
      }
    };
    fetchListing();
  }, [params.listingId]);

  // Admin Security Check
  const ADMIN_EMAIL = 'ugochukwumickel15@gmail.com';

  if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'>
        <h1 className='text-2xl font-bold text-slate-800 mb-2'>Restricted Access</h1>
        <p className='text-slate-500 mb-6 max-w-md text-sm'>
          This portal is reserved exclusively for verified property managers. Regular users cannot publish listings here.
        </p>
        <button 
          onClick={() => navigate('/')}
          className='px-6 py-3 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-900 transition'
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setImageUploadError(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 MB max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload up to 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'mern_project');

      fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/auto/upload`, {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.secure_url) {
            resolve(data.secure_url);
          } else {
            reject('Upload failed');
          }
        })
        .catch((err) => reject(err));
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one property image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discounted price must be lower than the regular price');
      setLoading(true);
      setError(false);
     const res = await fetch(
    params.listingId ? `/api/listing/update/${params.listingId}` : '/api/listing/create',
        {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-6 max-w-5xl mx-auto'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-extrabold text-slate-800 tracking-tight'>
          List a New Property
        </h1>
        <p className='text-slate-500 mt-2 text-sm'>
          Publish direct landlord properties securely to protect home seekers from fake agents.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white shadow-xl rounded-2xl p-6 sm:p-10 border border-slate-100 flex flex-col lg:flex-row gap-8'>
        
        {/* Left Column: General Info, Specs & Landlord Details */}
        <div className='flex flex-col gap-5 flex-1'>
          <h2 className='text-lg font-semibold text-slate-700 border-b pb-2'>1. Property Information</h2>
          
          <div>
            <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Property Title</label>
            <input
              type='text'
              placeholder='e.g., Cozy 1-Bedroom Apartment in Yaba'
              className='border border-slate-300 p-3.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm transition'
              id='name'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Description</label>
            <textarea
              placeholder='Describe features, kitchen fittings, power supply stability, and neighborhood vibes...'
              className='border border-slate-300 p-3.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm h-32 transition'
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Location / Address</label>
            <input
              type='text'
              placeholder='e.g., Herbert Macaulay Way, Yaba, Lagos'
              className='border border-slate-300 p-3.5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm transition'
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />
          </div>

          {/* Dedicated Section with Border for Landlord Contact Info */}
          <div className='mt-4 pt-4 border-t border-slate-200'>
            <h2 className='text-lg font-semibold text-slate-700 mb-3'>Landlord Contact Details (Hidden until user pays commission)</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200'>
              <div>
                <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Landlord Name</label>
                <input
                  type='text'
                  placeholder='e.g., Mr. Adeleke'
                  className='border border-slate-300 p-3 rounded-xl w-full text-sm bg-white'
                  id='landlordName'
                  required
                  onChange={handleChange}
                  value={formData.landlordName}
                />
              </div>
              <div>
                <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Landlord Phone Number</label>
                <input
                  type='text'
                  placeholder='e.g., 08031234567'
                  className='border border-slate-300 p-3 rounded-xl w-full text-sm bg-white'
                  id='landlordPhone'
                  required
                  onChange={handleChange}
                  value={formData.landlordPhone}
                />
              </div>
            </div>
          </div>

          {/* Categories & Amenities Checkboxes */}
          <div className='pt-2'>
            <label className='block text-xs font-semibold uppercase text-slate-500 mb-3'>Listing Category & Features</label>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200'>
              <div className='flex items-center gap-2.5 cursor-pointer'>
                <input
                  type='checkbox'
                  id='sale'
                  className='w-4 h-4 accent-slate-700 cursor-pointer'
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <span className='text-sm font-medium text-slate-700'>For Sale</span>
              </div>
              <div className='flex items-center gap-2.5 cursor-pointer'>
                <input
                  type='checkbox'
                  id='rent'
                  className='w-4 h-4 accent-slate-700 cursor-pointer'
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span className='text-sm font-medium text-slate-700'>For Rent</span>
              </div>
              <div className='flex items-center gap-2.5 cursor-pointer'>
                <input
                  type='checkbox'
                  id='parking'
                  className='w-4 h-4 accent-slate-700 cursor-pointer'
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className='text-sm font-medium text-slate-700'>Parking Space</span>
              </div>
              <div className='flex items-center gap-2.5 cursor-pointer'>
                <input
                  type='checkbox'
                  id='furnished'
                  className='w-4 h-4 accent-slate-700 cursor-pointer'
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className='text-sm font-medium text-slate-700'>Furnished</span>
              </div>
              <div className='flex items-center gap-2.5 cursor-pointer'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-4 h-4 accent-slate-700 cursor-pointer'
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className='text-sm font-medium text-slate-700'>Special Offer</span>
              </div>
            </div>
          </div>

          {/* Rooms and Pricing */}
          <div className='grid grid-cols-2 gap-4 pt-2'>
            <div>
              <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Bedrooms</label>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3.5 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm'
                onChange={handleChange}
                value={formData.bedrooms}
              />
            </div>
            <div>
              <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>Bathrooms</label>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3.5 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm'
                onChange={handleChange}
                value={formData.bathrooms}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>
                Regular Price <span className='normal-case font-normal text-slate-400'>(₦)</span>
              </label>
              <input
                type='number'
                id='regularPrice'
                min='5000'
                max='1000000000'
                required
                className='p-3.5 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm'
                onChange={handleChange}
                value={formData.regularPrice}
              />
            </div>

            {formData.offer && (
              <div>
                <label className='block text-xs font-semibold uppercase text-slate-500 mb-1'>
                  Discounted Price <span className='normal-case font-normal text-slate-400'>(₦)</span>
                </label>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='1000000000'
                  required
                  className='p-3.5 border border-slate-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Images & Upload */}
        <div className='flex flex-col flex-1 gap-5'>
          <h2 className='text-lg font-semibold text-slate-700 border-b pb-2'>2. Property Photos</h2>
          
          <div className='bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300'>
            <p className='font-medium text-sm text-slate-700 mb-2'>
              Upload Images <span className='text-xs font-normal text-slate-500'>(Max 6 images, first is cover)</span>
            </p>
            <div className='flex gap-3 items-center'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-800 text-sm text-slate-500 w-full cursor-pointer'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='px-5 py-3 text-emerald-700 bg-emerald-50 border border-emerald-600 font-semibold rounded-xl uppercase text-xs tracking-wider hover:bg-emerald-100 disabled:opacity-50 transition'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>

          <p className='text-red-600 text-xs font-medium'>
            {imageUploadError && imageUploadError}
          </p>

          {/* Preview Uploaded Images */}
          <div className='flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1'>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 bg-white border border-slate-200 rounded-xl items-center shadow-sm'
                >
                  <img
                    src={url}
                    alt='listing cover'
                    className='w-20 h-16 object-cover rounded-lg border'
                  />
                  <span className='text-xs font-medium text-slate-500 truncate max-w-[180px] px-2'>Image {index + 1}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg uppercase hover:bg-red-100 transition'
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <div className='mt-auto pt-6'>
            <button
              disabled={loading || uploading}
              className='w-full py-4 bg-slate-800 text-white font-bold rounded-xl uppercase tracking-wider text-sm hover:bg-slate-900 shadow-lg shadow-slate-200 disabled:opacity-75 transition duration-200'
            >
              {loading ? 'Publishing Listing...' : 'Publish Property Listing'}
            </button>
            {error && <p className='text-red-600 text-xs mt-3 text-center font-medium'>{error}</p>}
          </div>
        </div>

      </form>
    </main>
  );
}