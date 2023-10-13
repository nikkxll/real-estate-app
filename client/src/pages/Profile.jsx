import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const { currentUser } = useSelector(state => state.user) 
  const fileReference =  useRef(null)
  const [file, setFile] = useState(undefined)
  const [fileErr, setFileErr] = useState(false)
  const [filePerc, setFilePerc] = useState(0)
  const [formData, setFormData] = useState({})

  // firebase 
  // allow read; 
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload =(file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `photos/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', (snapshot) => {
        const progress = snapshot.bytesTransferred/snapshot.totalBytes*100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileErr(true);
      },
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => setFormData({ ...formData, photo: downloadURL }));
        }
      );
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-2xl text-center font-semibold my-4 text-slate-700'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} 
              type="file" ref={fileReference} hidden accept='image/*' />
        <img onClick={() => fileReference.current.click()} 
          className='rounded-full h-20 w-20 object-cover cursor-pointer self-center' 
          src={formData.photo || currentUser.photo} 
          alt='profile-photo'/>
        <p className='text-center'>
          {fileErr ? (
            <span className='text-red-500 font-semibold'>Error occurred, try again!</span>
          ) : 
            filePerc > 0 && filePerc < 100 ? 
          (
            <span className='text-green-800 font-semibold'>{`Uploading ${filePerc}%`}</span>
          ) :
            filePerc === 100 ? 
          (
            <span className='text-green-800 font-semibold'>Done</span>
          ) : 
            ''
          }
        </p>
        <input type="text" placeholder='username'
        className='border p-4 rounded-xl'
        id='username'/>
        <input type="text" placeholder='email'
        className='border p-4 rounded-xl'
        id='email'/>
        <input type="text" placeholder='password'
        className='border p-4 rounded-xl'
        id='password'/>
        <button className='bg-slate-700 p-3 text-white
                rounded-xl uppercase hover:opacity-90 mt-5
                disabled:opacity-70'>
          Update
        </button>
      </form>
      <div className='mt-4 flex justify-between'>
        <span className='text-red-600 cursor-pointer font-semibold'>Delete Account</span>
        <span className='text-red-600 cursor-pointer font-semibold'>Sign out</span>
      </div>
    </div>
  )
}
