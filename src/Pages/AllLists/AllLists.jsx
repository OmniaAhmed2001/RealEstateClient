import { useEffect, useState } from "react";
import "./AllLists.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AllLists() {
  const navigate = useNavigate();

  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser, token } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    (async () => {
      try {
        setShowListingError(false);

        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/user/listings/${currentUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await res.json();
        if (data.success === false) {
          setShowListingError(true);
          return;
        }
        console.log(data);
        setUserListings(data);
        console.log(userListings);
      } catch (error) {
        setShowListingError(true);
        console.log(7.5);
      }
    })(); // Call the function
  }, [currentUser._id]);
  const handleDleteListing = async (listingId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/delete/${listingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.log(data.message);
        return;
      }
      const data = await res.json();
      setUserListings((prev) => {
        return prev.filter((listing) => listing._id !== listingId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEditNavigation = (listingId) => {
    navigate(`/update-listing/${listingId}`);
  };
  return (
    <div>
      {userListings.length >= 1 ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-10 my-14 justify-items-center max-w-7xl mx-auto ">
          {userListings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="text-center bg-[#FEFBF6] shadow-lg w-full px-3 pb-4 rounded-xl "
              >
                <img
                  src={listing.imageUrls[0]}
                  alt=""
                  className="w-[100%] rounded-lg  object-contain mt-2"
                ></img>
                <h1 className="my-3 font-bold text-xl">{listing.name}</h1>
                <div className="flex gap-2 items-center ps-2">
                  <i className="fa-solid fa-location-dot text-blue-700"></i>
                  <p>
                    {listing.address.street}, {listing.address.city}, {listing.address.country}
                  </p>
                  
                </div>
                <div className="flex gap-2 items-center ps-2">
                  <i className="fa-solid fa-money-bill text-blue-700"></i>
                  <p>{listing.regularPrice}</p>
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditNavigation(listing._id)}
                    className="bg-[#f1843e] w-[35%] px-4 py-1 font-semibold text-white shadow-md hover:opacity-90 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDleteListing(listing._id)}
                    className="bg-white w-[35%]  py-1 font-semibold text-[#f1843e] border border-[#f1843e] shadow-md hover:opacity-90 rounded-md"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-3 mb-2">
                  <button
                    className="bg-white w-full  py-1 font-semibold text-[#f1843e] border border-[#f1843e] shadow-md hover:opacity-90 rounded-md"
                    onClick={() => navigate(`/listing/${listing._id}`)}
                  >
                    Show All Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
