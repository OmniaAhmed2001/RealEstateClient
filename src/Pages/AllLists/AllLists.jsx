import { useEffect, useState } from "react";
import "./AllLists.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function AllLists() {
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const currentUser = useSelector((state) => {
    return state.currentUser;
  });
  useEffect(() => {
    async () => {
      try {
        setShowListingError(false);
        const res = await fetch(`/api/user/listings/:${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingError(true);
      }
    };
  }, []);
  return (
    <div>
      {showListingError && (
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
      )}
      {userListings &&
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
        })}
    </div>
  );
}
