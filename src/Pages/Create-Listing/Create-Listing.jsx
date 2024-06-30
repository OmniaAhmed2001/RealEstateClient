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
import "./Create-Listing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const countryCity = [
  "Alexandria",
  "Aswan",
  "Asyut",
  "Beheira",
  "Beni Suef",
  "Cairo",
  "Dakahlia",
  "Damietta",
  "Fayoum",
  "Gharbia",
  "Giza",
  "Ismailia",
  "Kafr El Sheikh",
  "Luxor",
  "Matruh",
  "Minya",
  "Monufia",
  "Al Wadi al Jadid",
  "North Sinai",
  "Port Said",
  "Qalyubia",
  "Qena",
  "Red Sea",
  "Sharqia",
  "Sohag",
  "South Sinai",
  "Suez",
];

export default function CreateListing() {
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    address: {
      street: "",
      city: "",
      country: "",
    },
    offer: false,
    furnished: false,
    parking: false,
    discountPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
  });
  const { currentUser, token } = useSelector((state) => {
    return state.user;
  });
  const navigate = useNavigate();

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
    console.log(e.target.id, e.target.value, formData);
    if (e.target.id === "listingType") {
      setFormData({ ...formData, type: e.target.value });
    } else if (e.target.id === "property") {
      setFormData({ ...formData, property: e.target.value });
    } else if (e.target.id === "parking" || e.target.id === "furnished") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else if (e.target.id === "offer") {
      e.target.checked
        ? setFormData({ ...formData, [e.target.id]: e.target.checked })
        : setFormData({
            ...formData,
            [e.target.id]: e.target.checked,
            discountPrice: 0,
          });
    } else if (
      e.target.id === "city" ||
      e.target.id === "country" ||
      e.target.id === "street"
    ) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.id]: e.target.value, // Update inside address object
        },
      });
    } else if (e.target.type === "text" || e.target.type === "textarea") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else if (e.target.type === "number") {
      setFormData({ ...formData, [e.target.id]: +e.target.value });
    }
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("HIIIII ", formData);
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount Price Should be Less than Regular Price");
      }
      if (!formData.property || !formData.type)
        return setError("You must fill all fields");
      if (
        formData.regularPrice >= formData.discountPrice &&
        formData.imageUrls.length >= 1
      ) {
        setError(false);
        setLoading(true);
      }

      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          credentials: "include",
          body: JSON.stringify({ ...formData, userRef: currentUser._id }),
        }
      );
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="lg:max-w-5xl md:max-w-5xl sm:w-full min-h-screen">
      <h2 className="text-4xl	text-center font-semibold my-7">
        Add your Property with <span className="text-[#ffcb74]">Egy</span>
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
            Add all information related to your property
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
            className="bg-[#d8a537] w-10 mx-auto h-10 flex justify-center items-center font-bold text-white"
          >
            3
          </p>
          <h1 className="font-semibold mt-3">
            The final step is to fill your property
          </h1>
        </div>
      </div>
      <div className="bg-[#FFFAF2] p-5 px-10 my-12 shadow-lg">
        <h2 className="lg:text-4xl md:text-4xl text-3xl font-semibold mb-10 mt-5">
          Fill The Form
        </h2>
        <form onSubmit={handleSubmitForm} className=" mt-4 flex flex-col gap-6">
          <div className="gap-4 flex flex-col flex-1">
            <div className="flex flex-wrap gap-6 flex-row justify-between">
              <input
                type="text"
                className="p-3 rounded-lg md:w-[50%] w-full border border-slate-200 hover:border-slate-400"
                placeholder="Name"
                maxLength="62"
                minLength="10"
                required
                value={formData.name}
                onChange={handleChange}
                id="name"
              ></input>

              <select
                id="listingType"
                onChange={handleChange}
                className="md:w-[45%] w-full p-2 border border-slate-200 hover:border-slate-400 rounded-lg text-gray-400 font-bold"
              >
                <option disabled selected value="" className="opacity-10 ">
                  Listing Type
                </option>
                <option className=" text-black" value="sale">
                  Sale
                </option>
                <option className=" text-black" value="rent">
                  Rent
                </option>
              </select>

              <select
                id="property"
                onChange={handleChange}
                className="w-full p-2 border border-slate-200 hover:border-slate-400 rounded-lg text-gray-400 font-bold"
              >
                <option disabled selected value="" className="opacity-10">
                  Property Type
                </option>
                <option className=" text-black" value="cottage">
                  Cottage
                </option>
                <option className=" text-black" value="villa">
                  Villa
                </option>
                <option className=" text-black" value="penthouse">
                  Penthouse
                </option>
                <option className=" text-black" value="studio">
                  Studio
                </option>
                <option className=" text-black" value="appartment">
                  Apartment
                </option>
              </select>
            </div>
            
            <div className="flex justify-between  w-full flex-wrap">
              <input
                type="text"
                className="p-3 my-2 w-full md:w-[50%] rounded-lg border border-slate-200 hover:border-slate-400"
                placeholder="Street"
                required
                value={formData.address.street}
                onChange={handleChange}
                id="street"
              ></input>

              {/* city inpput changed to a drop down list */}
              <select
                id="city"
                onChange={handleChange}
                className="p-2 my-2 w-full md:w-[20%] rounded-lg border border-slate-200 hover:border-slate-400 text-gray-400 font-bold"
              >
                <option disabled selected value="" className="opacity-10 ">
                  City
                </option>
                {countryCity.map((city) => (
                  <option className=" text-black" key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="p-3 my-2 w-full md:w-[20%] rounded-lg border border-slate-200 hover:border-slate-400"
                placeholder="Country"
                required
                value={formData.address.country}
                onChange={handleChange}
                id="country"
              ></input>
            </div>

            <div className="flex flex-wrap items-center w-full justify-between gap-2">
              <div className="flex gap-2 mb-4 sm:mb-0">
                <input
                  onChange={handleChange}
                  checked={formData.furnished}
                  id="furnished"
                  type="checkbox"
                  className="w-4"
                />
                <span>Furniture</span>
              </div>
              <div className="flex gap-2 mb-4 sm:mb-0">
                <input
                  onChange={handleChange}
                  checked={formData.parking}
                  id="parking"
                  type="checkbox"
                  className="w-4"
                />
                <span>Parking</span>
              </div>
              <div className="flex gap-2 mb-4 sm:mb-0">
                <input
                  onChange={handleChange}
                  checked={formData.offer}
                  id="offer"
                  type="checkbox"
                  className="w-4"
                />
                <span>Offer</span>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="1"
                  max="10"
                  id="bedrooms"
                  required
                  className="w-16 h-10 p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
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
                />
                <p>Baths</p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center my-5 w-full justify-between">
              <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:gap-4 md:items-center mb-4 md:mb-0">
                <input
                  type="number"
                  min="50"
                  id="regularPrice"
                  required
                  className="lg:w-40 md:w-30 w-50 p-3 rounded-lg h-10 border border-slate-200 hover:border-slate-400"
                  onChange={handleChange}
                  value={formData.regularPrice}
                ></input>
                <div className="flex flex-wrap items-center ">
                  <p>Regular Price</p>
                  {formData.type && formData?.type === "rent" && (
                    <span className="text-xs">( EGP / Month)</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse items-start gap-2 md:flex-row md:gap-4 md:items-center mb-4 md:mb-0">
                <input
                  type="number"
                  min="0"
                  id="discountPrice"
                  disabled={!formData.offer}
                  required
                  className={`lg:w-40 md:w-30 w-50 p-3 rounded-lg h-10 border border-slate-200 hover:border-slate-400`}
                  style={{ display: `${formData.offer ? "block" : "none"}` }}
                  onChange={handleChange}
                  value={formData.discountPrice}
                ></input>
                <div
                  className="flex flex-wrap items-center"
                  style={{ display: `${formData.offer ? "flex" : "none"}` }}
                >
                  <p>Discounted Price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs">( EGP / Month)</span>
                  )}
                </div>
              </div>
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

            <div className="flex gap-10 flex-wrap items-center">
              <input
                className="p-2 rounded lg:max-w-[50%] md:max-w-[50%] max-w-28"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
              ></input>
              <button
                type="button"
                className="h-9 flex items-center justify-center w-36 text-white font-bold disabled:opacity-80 rounded-lg hover:shadow-md  bg-ffb534"
                onClick={handleImageSubmit}
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon
                      className="text-lg font-semibold"
                      icon={faSpinner}
                      spin
                      style={{ fontSize: "25px" }}
                    />
                    <p>Uploading...</p>
                  </div>
                ) : (
                  "Upload"
                )}
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
              className="uppercase bg-ffb534 text-white py-3 px-2 rounded-2xl font-bold text-lg w-[100%] hover:shadow-md"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-3">
                  <FontAwesomeIcon
                    className="text-lg font-semibold"
                    icon={faSpinner}
                    spin
                    style={{ fontSize: "25px" }}
                  />
                  <p>Adding...</p>
                </div>
              ) : (
                "Add Property"
              )}
            </button>
          </div>

          {error && <p className="text-sm text-red-700">{error}</p>}
        </form>
      </div>
    </div>
  );
}
