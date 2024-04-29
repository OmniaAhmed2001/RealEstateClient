// import React from "react";

import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Update_Listing() {
  const { currentUser } = useSelector((state) => {
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
  const params = useParams();
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
    } else if (e.target.id === "listingType") {
      setFormData({ ...formData, type: e.target.id });
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (formData.regularPrice < formData.discountPrice) {
        return setError("Discount Price Should be Less than Regular Price");
      }
      setError(false);
      setLoading(true);

      const res = await fetch(
        `https://egyestateserver.onrender.com/listing/update/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        }
      );

      console.log(res);

      const data = await res.json();
      console.log(20);

      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError("data.message");
      }
      navigate(`/listings/allLists`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;

      const res = await fetch( `https://egyestateserver.onrender.com/listing/get/${listingId}`, {
        credentials: "include",
      });

      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        console.log(123156);
        return;
      }
      setFormData(data);
      console.log(120);
    };
    fetchListing();
  }, []);
  return (
    <div className="p-3 lg:max-w-4xl md:max-w-4xl sm:w-full mx-auto">
      <h2 className="text-4xl	text-center font-semibold my-7">
        Update your Property with <span className="text-[#ffcb74]">Egy</span>
        <span className="text-[#ffb534]">Estate</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-10">
        <div className="  text-center p-6 bg-[#FEFBF6] shadow-lg">
          <p
            style={{
              borderRadius: "50%",
              backgroundImage: "linear-gradient(to left, #F1843E, #ffe12a)", // Example gradient colors
            }}
            className="bg-[#F1843E] w-10 mx-auto h-10 flex justify-center items-center font-bold text-white"
          >
            1
          </p>
          <h1 className="mt-3 font-semibold">
            Add All Information related to your Property
          </h1>
        </div>
        <div className="  text-center p-6 bg-[#FEFBF6] shadow-lg">
          <p
            style={{
              borderRadius: "50%",
              backgroundImage: "linear-gradient(to left, #F1843E, #ffe12a)", // Example gradient colors
            }}
            className=" w-10 mx-auto h-10 flex justify-center items-center font-bold text-white"
          >
            2
          </p>

          <h1 className="mt-3 font-semibold">
            We will help you find the best buyer
          </h1>
        </div>
        <div className="  text-center p-6 bg-[#FEFBF6] shadow-lg">
          <p
            style={{
              borderRadius: "50%",
              backgroundImage: "linear-gradient(to left, #F1843E, #ffe12a)", // Example gradient colors
            }}
            className="bg-[#F1843E] w-10 mx-auto h-10 flex justify-center items-center font-bold text-white"
          >
            3
          </p>
          <h1 className="font-semibold mt-3">
            The Final step is to fill your property
          </h1>
        </div>
      </div>
      <div className="bg-[#FEFBF6] p-3 my-12 shadow-lg">
        <h2 className="text-4xl font-semibold mb-10 mt-5">Fill The Form</h2>
        <form onSubmit={handleSubmitForm} className=" mt-4 flex flex-col gap-6">
          <div className="gap-4  flex flex-col flex-1">
            <div className="flex lg:flex-row md:flex-row sm:flex-col justify-between">
              <input
                type="text"
                className="border p-3 rounded-lg lg:w-[50%] md:w-[50%] sm:w-100"
                placeholder="Name"
                maxLength="62"
                minLength="10"
                required
                value={formData.name}
                onChange={handleChange}
                id="name"
              ></input>
              <div className="lg:w-[35%] md:w-[35%] sm:w-100 lg:mt-0 md:mt-0 sm:mt-4">
                <select
                  id="listingType"
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 hover:border-slate-400 rounded-lg"
                >
                  <option
                    disabled
                    selected
                    value=""
                    className="opacity-10 texy-red"
                  >
                    Listing Type
                  </option>
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              className="border p-3 rounded-lg lg:w-[50%] md:w-[50%] sm:w-100"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
              id="address"
            ></input>
            <div>
              <h2 className="text-2xl font-semibold mb-4 mt-5">Listing Type</h2>
              <div className="flex gap-6">
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
              </div>
            </div>
            <h2 className="text-2xl font-semibold mt-5">Other Features</h2>
            <div className="flex flex-wrap gap-6">
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
                <br className="lg:hidden  md:hidden sm:block"></br>
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
                className="uppercase border h-12 px-2 text-white font-bold disabled:opacity-80 rounded hover:shadow-md p-1 bg-[#F1843E]"
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
          {formData.imageUrls &&
            formData.imageUrls.length >= 1 &&
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
          <div className="flex">
            <textarea
              type="text"
              className="border p-3 rounded-lg"
              placeholder="Description"
              required
              value={formData.description}
              onChange={handleChange}
              style={{ resize: "none", width: "100%" }}
              id="description"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              disabled={loading || uploading}
              className="uppercase bg-[#F1843E] text-white py-3 px-2 rounded-3xl font-bold text-lg lg:w-[50%] sm:w-[60%]"
            >
              {loading
                ? "Updateing..." +
                  <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
                : "Update Listing"}
            </button>
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}
        </form>
      </div>
    </div>
  );
}
