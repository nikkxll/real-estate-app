import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    imagesURL: [],
    name: "",
    description: "",
    address: "",
    area: 10,
    regularPrice: 100,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    petsAllowed: false,
    type: "rent",
    offer: true,
  });
  const [imgUploadError, setImgUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successUpload, setsuccessUpload] = useState(null);
  const [errorSubmit, seterrorSubmit] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [successSubmit, setsuccessSubmit] = useState(null);

  const handleImgSubmit = (e) => {
    setImgUploadError(false);
    setUploading(true);
    if (files.length > 0 && files.length + formData.imagesURL.length < 9) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imagesURL: formData.imagesURL.concat(url),
          });
          setUploading(false);
          setsuccessUpload("Successfully uploaded");
        })
        .catch((error) => {
          setImgUploadError(
            "Error occurred while loading (limit of max 2 mb per photo)"
          );
          setUploading(false);
        });
    } else {
      setImgUploadError("You can upload only 8 images per listing!");
      setUploading(false);
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `listingPhotos/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => resolve(downloadURL))
            .catch((error) => reject(error));
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imagesURL: formData.imagesURL.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "petsAllowed"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloadingSubmit(true);
    seterrorSubmit(false);
    setsuccessUpload(null);

    try {
      if (formData.imagesURL.length < 1) {
        setloadingSubmit(false);
        seterrorSubmit("You must upload at least one image to submit the form");
        return;
      }
      if (
        parseFloat(formData.regularPrice) < parseFloat(formData.discountPrice)
      ) {
        setloadingSubmit(false);
        seterrorSubmit("Discounted price must be lower than regular price");
        return;
      }
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        seterrorSubmit(data.message);
        return;
      }

      setloadingSubmit(false);
      setsuccessSubmit("Listing has been successfully created!");
      navigate(`/listing/${data._id}`)
    } catch (error) {
      seterrorSubmit(error.message);
      setloadingSubmit(false);
    }
  };

  return (
    <main className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 p-3">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
              Create a Listing
            </h1>
            <div className="p-3 flex flex-col gap-5 flex-1">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-xl"
                id="name"
                maxLength="100"
                minLength="5"
                required
                onChange={handleChange}
                value={formData.name}
              />
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 rounded-xl"
                id="description"
                maxLength="1000"
                required
                onChange={handleChange}
                value={formData.description}
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-xl"
                id="address"
                maxLength="1000"
                required
                onChange={handleChange}
                value={formData.address}
              />
            </div>
            <div className="p-3 max-w-3xl flex flex-wrap my-1 gap-4 sm:gap-8 justify-center">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="sale"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="rent"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="petsAllowed"
                  onChange={handleChange}
                  checked={formData.petsAllowed}
                />
                <span>Pets allowed</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-3">
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  min="10"
                  max="5000"
                  className="border p-3 rounded-xl"
                  id="area"
                  required
                  onChange={handleChange}
                  value={formData.area}
                />
                <div>
                  <p className="flex flex-col mx-3">Area</p>
                  <span className="mx-3 text-sm">
                    (m<sup>2</sup>)
                  </span>
                </div>
              </div>
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="border p-3 rounded-xl"
                  id="bedrooms"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <span className="p-3">Bedrooms</span>
              </div>
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="border p-3 rounded-xl"
                  id="bathrooms"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <span className="p-3">Bathrooms</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  className="border p-3 rounded-xl"
                  id="regularPrice"
                  min="100"
                  max="10000000"
                  required
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col mx-3 justify-center">
                  <p>Regular price</p>
                  {formData.type === "rent" && (
                    <span className="text-sm">($ per month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className="p-3 flex flex-row">
                  <input
                    type="number"
                    className="border p-3 rounded-xl"
                    min="0"
                    max="10000000"
                    id="discountPrice"
                    required
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className="flex flex-col mx-3 justify-center">
                    <p>Discounted price</p>
                    {formData.type === "rent" && (
                      <span className="text-sm">($ per month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1 p-3 my-6">
              <p className="font-semibold">
                Images:
                <span className="font-normal italic ml-2">
                  The first image will be the cover (max of 8)
                </span>
              </p>
              <div className="my-4 flex gap-4">
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  className="p-3 border border-gray-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  onClick={handleImgSubmit}
                  disabled={uploading}
                  type="button"
                  className="p-3 text-white bg-green-800
          rounded uppercase hover:opacity-90 disabled:opacity-70"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-500 p-1">
                {imgUploadError ? (
                  imgUploadError
                ) : formData.imagesURL.length > 0 ? (
                  <span className="text-green-700">{successUpload}</span>
                ) : (
                  ""
                )}
              </p>
              <button
                disabled={loadingSubmit || uploading}
                className="bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90
        disabled:opacity-70"
              >
                {loadingSubmit ? "Creating..." : "Create listing"}
              </button>
              <p className="text-red-500 p-1">
                {errorSubmit ? (
                  errorSubmit
                ) : formData.name ? (
                  <span className="text-green-700">{successSubmit}</span>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
          <div className="flex-1 p-4">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
              Uploaded images
            </h1>
            <div className="p-3 flex flex-wrap gap-4 justify-center items-center h-screen overflow-y-auto">
              {formData.imagesURL.length > 0 ? (
                formData.imagesURL.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 items-center border rounded-xl"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-44 h-32 object-cover max-w-full max-h-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="p-3 text-red-500 rounded-xl hover:opacity-90 disabled:opacity-80"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xl font-semibold italic text-center text-slate-700">
                  No photos added yet...
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
