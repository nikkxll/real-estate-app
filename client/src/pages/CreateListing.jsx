import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imagesURL: [],
  });
  const [imgUploadError, setImgUploadError] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  return (
    <main className="p-3">
      <form className="flex flex-col gap-3">
        <div className="flex flex-col flex-wrap sm:flex-row">
          <div className="mx-4 w-auto">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
              Create a Listing
            </h1>
            <div className="p-3 flex flex-col gap-7 flex-1">
              <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-xl"
                id="name"
                maxLength="100"
                minLength="5"
                required
              />
              <textarea
                type="text"
                placeholder="Description"
                className="border p-3 rounded-xl"
                id="description"
                maxLength="1000"
                required
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-xl"
                id="address"
                maxLength="1000"
                required
              />
            </div>
            <div className="p-3 max-w-3xl flex flex-wrap my-1 sm:gap-10 ">
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="sale" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="rent" />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="pets-allowed" />
                <span>Pets allowed</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="parking-spot" />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="furnished" />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="offer" />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="border p-3 rounded-xl"
                  id="bedrooms"
                  required
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
                />
                <span className="p-3">Bathrooms</span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  className="border p-3 rounded-xl"
                  id="regular-price"
                  required
                />
                <div>
                  <p className="flex flex-col mx-3">Regular price</p>
                  <span className="mx-3 text-sm">($ per month)</span>
                </div>
              </div>
              <div className="p-3 flex flex-row">
                <input
                  type="number"
                  className="border p-3 rounded-xl"
                  id="discounted-price"
                  required
                />
                <div>
                  <p className="flex flex-col mx-3">Discounted price</p>
                  <span className="mx-3 text-sm">($ per month)</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-3">
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
                  className="p-3 text-green-800 border border-green-700
          rounded uppercase hover:opacity-90 disabled:opacity-70"
                >
                  {uploading ? "Loading..." : "Upload"}
                </button>
              </div>
              <p className="text-red-500 p-1">
                {imgUploadError ? (
                  imgUploadError
                ) : formData.imagesURL.length > 0 ? (
                  <p className="text-green-700">Successfully loaded!</p>
                ) : (
                  ""
                )}
              </p>
              <button
                className="bg-slate-700 p-3 text-white
        rounded-xl uppercase hover:opacity-90
        disabled:opacity-70"
              >
                Create listing
              </button>
            </div>
          </div>
          <div className="mx-auto w-5/12 space-y-5">
            <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
              Uploaded images
            </h1>
            <div className="p-3 flex flex-wrap gap-4 justify-center items-center">
              {formData.imagesURL.length > 0 ? (
                formData.imagesURL.map((url, index) => (
                  <div
                    key={url}
                    className="flex justify-between p-3 items-center border rounded-xl"
                  >
                    <img
                      src={url}
                      alt="listing image"
                      className="w-48 h-36 object-cover"
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
                  No photos added yet
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
