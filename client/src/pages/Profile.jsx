import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileReference = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [fileErr, setFileErr] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setshowListingsError] = useState(false);
  const [showListingsLoading, setshowListingsLoading] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // firebase
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `photos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photo: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async (e) => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async (e) => {
    dispatch(signOutUserStart());

    try {
      const res = await fetch("/api/auth/signout");
      const data = res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async (e) => {
    e.preventDefault();
    setshowListingsError(false);
    setshowListingsLoading(true);

    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setshowListingsError(true);
        setshowListingsLoading(false);
        return;
      }

      setshowListingsLoading(false);
      setUserListings(data);
    } catch (error) {
      setshowListingsError(true);
      setshowListingsLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl text-center font-semibold my-4 text-slate-700">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileReference}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileReference.current.click()}
          className="rounded-full h-20 w-20 object-cover cursor-pointer self-center"
          src={formData.photo || currentUser.photo}
          alt="profile-photo"
        />
        <p className="text-center">
          {fileErr ? (
            <span className="text-red-500 font-semibold">
              Error occurred, try again!
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-800 font-semibold">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-800 font-semibold">Done</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-4 rounded-xl"
          onChange={handleChange}
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-4 rounded-xl"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="border p-4 rounded-xl"
          onChange={handleChange}
          id="password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 text-white
                rounded-xl uppercase hover:opacity-90 mt-4
                disabled:opacity-70"
        >
          {loading ? "Loading..." : "Update profile"}
        </button>
        <Link
          className="bg-green-700 p-3 text-white
                  rounded-xl uppercase hover:opacity-90
                  disabled:opacity-70 text-center"
          to={"/create-listing"}
        >
          Create listing
        </Link>
      </form>
      <div className="mt-4 flex justify-between">
        <span
          onClick={handleDelete}
          className="text-red-600 cursor-pointer font-semibold"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-600 cursor-pointer font-semibold"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-500 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "Profile successfully updated" : ""}
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleShowListings}
          disabled={loading}
          className="text-green-700 font-semibold border border-green-700 rounded-xl 
          p-2 shadow-lg hover:opacity-90 disabled:opacity-70"
        >
          {showListingsLoading ? "Loading..." : "Show listings"}
        </button>
        <p className="text-red-500 mt-5">
          {showListingsError ? "Error occured" : ""}
        </p>
      </div>
      {userListings && userListings.length > 0 ? (
        <>
          <p className="text-2xl text-slate-700 font-semibold p-4 my-4 flex justify-center">
            Your Listing
          </p>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="mt-6 gap-4 border flex justify-between items-center rounded-xl"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imagesURL[0]}
                  alt="Listing cover"
                  className="w-32 object-contain max-w-full max-h-full rounded-xl"
                />
              </Link>
              <Link
                className="flex-1 text-slate-700 font-semibold hover:underline truncate"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col">
                <button type="button" className="p-2 text-red-700 uppercase">
                  Delete
                </button>
                <button type="button" className="p-2 text-green-700 uppercase">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
