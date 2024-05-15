import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/user/userSlice";
import ListingItem from "../../Components/ListingItem";

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
    const favoritesArray = newListings.map(listing=>listing._id)

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
    <div style={{ minHeight: "100vh" }}>
      {!listings || listings?.length === 0 ? (
        <p>You haven&apos;t chosen your favorite estate yet.</p>
      ) : (
        <div>
          <p>Favorite Items:</p>
          <div className="flex flex-wrap justify-center items-center gap-6 min-w-12">
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
  );
};

export default Favorites;
