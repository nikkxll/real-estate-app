import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7 text-slate-700'>
        Create a Listing
      </h1>
      <form className='flex flex-col gap-3'>
        <div className='p-3 flex flex-col gap-7 flex-1'>
          <input 
            type="text" 
            placeholder='Name' 
            className='border p-3 rounded-xl'
            id='name'
            maxLength='100'
            minLength='5'
            required />
          <textarea 
            type="text" 
            placeholder='Description' 
            className='border p-3 rounded-xl'
            id='description'
            maxLength='1000'
            required />
          <input 
            type="text" 
            placeholder='Address' 
            className='border p-3 rounded-xl'
            id='address'
            maxLength='1000'
            required />
        </div>
        <div className='p-3 max-w-3xl flex flex-wrap my-1 sm:gap-10 '>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='sale'/>
            <span>
              Sell
            </span>
          </div>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='rent'/>
            <span>
              Rent
            </span>
          </div>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='pets-allowed'/>
            <span>
              Pets allowed
            </span>
          </div>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='parking-spot'/>
            <span>
              Parking spot
            </span>
          </div>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='furnished'/>
            <span>
              Furnished
            </span>
          </div>
          <div className='flex gap-2'>
            <input 
              type="checkbox" 
              className='w-5'
              id='offer'/>
            <span>
              Offer
            </span>
          </div>
        </div>
        <div className='flex flex-row gap-3'>
          <div className='p-3 flex flex-row'>
            <input          
              type="number"
              min='1'
              max='10'
              className='border p-3 rounded-xl'
              id='bedrooms'
              required />
            <span className='p-3'>
              Bedrooms
            </span>
          </div>
          <div className='p-3 flex flex-row'>
            <input          
              type="number"
              min='1'
              max='10'
              className='border p-3 rounded-xl'
              id='bathrooms'
              required />
            <span className='p-3'>
              Bathrooms
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='p-3 flex flex-row'>
            <input          
              type="number"
              className='border p-3 rounded-xl'
              id='regular-price'
              required />
            <div>
              <p className='flex flex-col mx-3'>
                Regular price
              </p>
              <span className='mx-3 text-sm'>
                ($ per month)
              </span>                
            </div>
          </div>
          <div className='p-3 flex flex-row'>
            <input          
              type="number"
              className='border p-3 rounded-xl'
              id='discounted-price'
              required />
            <div>
              <p className='flex flex-col mx-3'>
                Discounted price
              </p>
              <span className='mx-3 text-sm'>
                ($ per month)
              </span>                
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 p-3'>
          <p className='font-semibold'>Images: 
          <span className='font-normal italic ml-2'>
            The first image will be the cover (max of 6)
          </span>
          </p>
          <div className='p-3 my-3 flex gap-4'>
            <input 
              className='p-3 border border-gray-300 rounded w-full'
              type="file" 
              id='images' 
              accept='image/*' 
              multiple />
            <button className='p-3 text-green-700 border border-green-700
              rounded uppercase hover:shadow-xl 
              disabled:opacity-80'>
                Upload
            </button>
          </div>
        </div>
        <button className='bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90
        disabled:opacity-70'>
          Create listing
        </button>
      </form>
    </main>
  )
}
