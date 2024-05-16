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

      const data = res.json();
      if (data.success === "false") {
        console.log(data.message);
        return;
      }
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
    <div className="min-h-screen">
      {userListings.length >= 1 ? (
        <div className="flex flex-wrap justify-center gap-10 my-14 max-w-7xl mx-auto ">
          {userListings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="text-center bg-[#FEFBF6] shadow-lg w-[65%] md:w-[45%] lg:w-[25%] rounded-xl overflow-hidden"
              >
                <img
                  src={listing.imageUrls[0]}
                  alt=""
                  className="w-full rounded-t-lg object-cover h-40 sm:h-48 md:h-56 lg:h-64"
                ></img>
                <div className="p-4 flex flex-col">
                  <h1 className="my-3 font-bold text-lg">{listing.name}</h1>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="flex justify-center gap-1 h-10 self-start">
                      <i className="fa-solid fa-location-dot text-ff9a62 pt-1"></i>
                      <p className="text-left">
                      {listing.address.street}, {listing.address.city}, {listing.address.country}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center self-start mb-2">
                      <i className="fa-solid fa-money-bill text-green-600"></i>
                      <p className="text-left">{listing.regularPrice}$</p>
                    </div>
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
                      className="bg-white w-[35%] py-1 font-semibold text-[#f1843e] border border-[#f1843e] shadow-md hover:opacity-90 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-3 mb-2">
                    <button
                      className="bg-white w-full py-1 font-semibold text-[#f1843e] border border-[#f1843e] shadow-md hover:opacity-90 rounded-md"
                      onClick={() => navigate(`/listing/${listing._id}`)}
                    >
                      Show All Details
                    </button>
                  </div>
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


