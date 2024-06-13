import { useEffect, useState } from "react";
import "./AllLists.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

export default function AllLists() {
  const navigate = useNavigate();
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
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
        if (!res.ok) {
          setShowListingError(true);
          return;
        }
        setUserListings(data);
        setLoading(false);
      } catch (error) {
        setShowListingError(true);
        setLoading(false);
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
    <div
      className="w-full flex justify-center items-center"
      style={{ minHeight: "80vh" }}
    >
      {loading ? (
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "80vh" }}
        >
          <RiseLoader
            color="#FFB534"
            loading="true"
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : userListings.length >= 1 ? (
        <div className="flex flex-wrap justify-center gap-10 my-14 w-full">
          {userListings.map((listing) => {
            return (
              <div
                key={listing._id}
                className="text-center bg-[#FEFBF6] shadow-lg w-7/12 sm:w-4/12 xl:w-3/12 rounded-xl overflow-hidden"
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
                        {listing.address.street}, {listing.address.city},{" "}
                        {listing.address.country}
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
        <div className="text-center">
          <img
            src="assets/fav.png"
            alt="No created properties"
            className="mx-auto mb-4 w-[5rem] "
          />
          <p>You don't have any created properties yet.</p>
          <p className="mb-4">Let's get started by creating a property.</p>
        </div>
      )}
    </div>
  );
}
