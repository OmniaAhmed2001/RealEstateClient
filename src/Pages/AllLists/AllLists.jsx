import { useEffect, useState } from "react";
import "./AllLists.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function AllLists() {
  const navigate = useNavigate();
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => {
    return state.user;
  });
  useEffect(() => {
    (async () => {
      try {
        setShowListingError(false);
        const res = await fetch(`/user/listings/${currentUser._id}`);
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
      const res = await fetch(`/listing/delete/${listingId}`, {
        method: "DELETE",
      });
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
    <div>
      {/* {showListingError && (
        <div>
          <div className="container container-star">
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-1"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
            <div className="star-2"></div>
          </div>
          <div className="container container-bird">
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="bird bird-anim">
              <div className="bird-container">
                <div className="wing wing-left">
                  <div className="wing-left-top"></div>
                </div>
                <div className="wing wing-right">
                  <div className="wing-right-top"></div>
                </div>
              </div>
            </div>
            <div className="container-title">
              <div className="title">
                <div className="number">4</div>
                <div className="moon">
                  <div className="face">
                    <div className="mouth"></div>
                    <div className="eyes">
                      <div className="eye-left"></div>
                      <div className="eye-right"></div>
                    </div>
                  </div>
                </div>
                <div className="number">4</div>
              </div>
              <div className="subtitle">
                Oops. Looks like you took a wrong turn.
                <br></br>
              </div>
              <button>Go back</button>
            </div>
          </div>
        </div>
      )} */}
      {/* {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => {
          return (
            <div key={listing._id}>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listingImage"></img>
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
            </div>
          );
        })} */}
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
                  <p>{listing.address}</p>
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
                  <button className="bg-white w-full  py-1 font-semibold text-[#f1843e] border border-[#f1843e] shadow-md hover:opacity-90 rounded-md">
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
