import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import ListingItem from "../../Components/ListingItem";
import { Link } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

const Favorites = () => {
  const [listings, setListings] = useState([]);
  const { currentUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/listing/getFavorites/${
            currentUser._id
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        setListings(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
        setLoading(false);
      }
    };

    setTimeout(() => {
      fetchListings();
    }, 300);

    return () => {};
  }, []);

  const removeFromFavorites = (id) => {
    const newListings = listings.filter((f) => f._id !== id);
    setListings(newListings);
    const favoritesArray = newListings.map((listing) => listing._id);

    updateFavoritesList(favoritesArray);
  };

  const updateFavoritesList = async (favoritesArray) => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/updateFavorites/${
          currentUser._id
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            favArray: favoritesArray,
          }),

          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      dispatch(updateUserSuccess(data));
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "80vh" }}
      >
        {loading ? (
          <RiseLoader
            color="#FFB534"
            loading="true"
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <div className="flex flex-col justify-center items-center">
            {!listings || listings?.length === 0 ? (
              <div className="text-center">
                <img
                  src="assets/fav.png"
                  alt="No favorite properties"
                  className="mx-auto mb-4 w-[5rem] "
                />
                <p>You don't have any favorite properties yet.</p>
                <p className="mb-4">
                  Let's get started with finding your next move.
                </p>
                <Link
                  to="/listing"
                  className="bg-ffb534 text-white py-2 px-4 rounded-lg hover:opacity-80"
                >
                  Explore Properties
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center mt-2">
                <div className="rounded-xl p-2 bg-fdf5e8 flex flex-col justify-center items-center h-9 mb-4 w-48">
                  <p className="text-center text-lg font-bold mb-4 mt-4 w-80 text-ffb534">
                    Favorite Properties
                  </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-6 min-w-12 mb-8">
                  {listings.map((item) => (
                    <ListingItem
                      key={item._id}
                      listing={item}
                      updateFavs={removeFromFavorites}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
