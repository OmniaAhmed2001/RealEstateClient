// import React from "react";

import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const currentUser = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    description: "",
    name: "",
    address: "",
    type: "rent",
    bathrooms: 2,
    bedrooms: 2,
    offer: false,
    furnished: false,
    regularPrice: 50,
    discountPrice: 0,
    parking: false,
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(setImageStore(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch(() => {
          setImageUploadError("Image Upload failed (max Size allowed 2mb)");
          setUploading(false);
        });
    } else if (files.length < 1) {
      setImageUploadError("Minimum Images allowed (1) per Listing");
      setUploading(false);
    } else if (files.length > 6) {
      setImageUploadError("Maximum Images allowed (6) per Listing");
      setUploading(false);
    }
  };

  const setImageStore = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const UploadTask = uploadBytesResumable(storageRef, file);
      UploadTask.on(
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
          getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((i) => {
        return i !== index;
      }),
    });
  };
  const handleChange = (e) => {
    console.log(e);
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (formData.regularPrice < formData.discountPrice)
        return setError("Discount Price Should be Less than Regular Price");
      setError(false);
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/:${formData._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-4xl mx-auto">
      <h2 className="text-4xl	text-center font-semibold my-7">
        Create a Listing
      </h2>
      <form onSubmit={handleSubmitForm} className="mt-4 flex flex-col gap-6">
        <div className="gap-4  flex flex-col flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Name"
            maxLength="62"
            minLength="10"
            required
            value={formData.name}
            onChange={handleChange}
            id="name"
          ></input>
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
            style={{ resize: "none" }}
            id="description"
          ></textarea>
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            required
            value={formData.address}
            onChange={handleChange}
            id="address"
          ></input>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "sale"}
                id="sale"
                type="checkbox"
                className="w-4"
              ></input>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.type === "rent"}
                id="rent"
                type="checkbox"
                className="w-4"
              ></input>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                id="furnished"
                type="checkbox"
                className="w-4"
              ></input>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.parking}
                id="parking"
                type="checkbox"
                className="w-4"
              ></input>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                id="offer"
                type="checkbox"
                className="w-4"
              ></input>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                id="bedrooms"
                required
                className=" w-16 h-10 p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              ></input>
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="1"
                max="10"
                id="bathrooms"
                required
                className="w-16 p-3 border border-gray-300 rounded-lg h-10"
                onChange={handleChange}
                value={formData.bathrooms}
              ></input>
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                min="50"
                max="10000"
                id="regularPrice"
                required
                className="w-16 p-3 border border-gray-300 rounded-lg h-10"
                onChange={handleChange}
                value={formData.regularPrice}
              ></input>
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">( $ / Month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="0"
                  max="10000"
                  id="discountPrice"
                  required
                  className="w-16 p-3 border border-gray-300 rounded-lg h-10"
                  onChange={handleChange}
                  value={formData.discountPrice}
                ></input>
                <div className="flex flex-col items-center">
                  <p>Discounted Price</p>
                  <span className="text-xs">( $ / Month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-semibold">
              Images:
              <span className="ml-2 font-normal text-gray-600 text-sm">
                The First image will be the Cover (max 6)
              </span>
            </p>
          </div>

          <div className="flex gap-10 ">
            <input
              className="p-3 border border-gray-400 w-50 rounded w-full"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            ></input>
            <button
              type="button"
              className="uppercase border text-green-700 border-green-700 disabled:opacity-80 rounded hover:shadow-md p-1"
              onClick={handleImageSubmit}
              disabled={uploading}
            >
              {uploading ? "uploading..." : "upload"}
            </button>
          </div>
        </div>
        <p className="text-red-700 text-sm">
          {imageUploadError && imageUploadError}
        </p>
        {formData &&
          formData.imageUrls.map((url) => {
            return (
              <div key={url} className="flex justify-between p-3 ">
                <img
                  src={url}
                  alt="listing Image"
                  className="w-20 h-20 rounded-lg object-contain"
                ></img>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="p-3 uppercase hover:opacity-75 text-red-700"
                >
                  Delete
                </button>
              </div>
            );
          })}
        <div className="text-center">
          <button
            disabled={loading || uploading}
            style={{ width: "50%" }}
            className="uppercase bg-slate-700 text-white py-4 px-2 rounded-3xl"
          >
            {loading ? "Creating ..." : "Create Listing"}
          </button>
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
      </form>
    </div>
  );
}
