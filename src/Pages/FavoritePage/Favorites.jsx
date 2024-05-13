import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStart } from "../../redux/user/userSlice";
import ListingItem from "../../Components/ListingItem";

const Favorites = () => {
  const [listings, setListings] = useState([]);
  const { currentUser, token } = useSelector((state) => state.user);
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
        console.log(data);

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

  return (

    <div style={{ minHeight: "100vh" }}>
      {!listings || listings?.length === 0 ? (
        <p>You haven&apos;t chosen your favorite estate yet.</p>
      ) : (
        <div>
          <p>Favorite Items:</p>
          <div className="flex flex-wrap justify-center items-center gap-6 min-w-12">
            {listings.map((item) => (
              <ListingItem key={item._id} listing={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
