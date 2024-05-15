import React, { useEffect, useRef, useState } from "react";
import { FaChevronUp, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import ListingItem from "../../Components/ListingItem";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const AllListings = () => {
  const initalQueryData = {
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  };
  const { currentUser, error, token } = useSelector((state) => state.user);
  const [sidebardata, setSidebardata] = useState(initalQueryData);
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const favorites = useRef(currentUser?.favorites || []);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const updateFavorites = (id) => {
    const index = favorites.current.findIndex((f) => f === id);
    if (index === -1) {
      favorites.current = [...favorites.current, id];
    } else {
      favorites.current = favorites.current.filter((f) => f !== id);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/listing/get?${searchQuery}`
      );
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  useEffect(() => {
    //on unmount
    return () => {
      const updateFavoritesList = async () => {
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
                favArray: favorites.current,
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
      if (currentUser) {
        updateFavoritesList();
      }
    };
  }, []);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/listing?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/listing/get?${searchQuery}`
    );
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row m-5">
      <div className="md:min-h-[500px] w-[300px] md:mr-5">
        <form
          onSubmit={handleSubmit}
          className="p-5 bg-filter rounded-xl mb-5 md:mb-0"
        >
          <div className="bg-searchInput flex items-center gap-2 p-2 rounded-lg">
            <FaSearch className="text-64748b" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
              id="searchTerm"
            />
          </div>
          <button
            className="bg-transparent text-sky-600 my-2"
            onClick={() => setSidebardata(initalQueryData)}
          >
            Clear all
          </button>
          <div
            className="flex items-center justify-between text-lg cursor-pointer"
            onClick={() => setIsTypeOpen(!isTypeOpen)}
          >
            <h5 className="font-bold">Type</h5>
            <FaChevronUp
              className={`transition-transform duration-200 ease-out ${
                !isTypeOpen && "rotate-180"
              }`}
            />
          </div>
          <div
            className="ml-3 transition-all duration-200 ease-out"
            style={{
              maxHeight: isTypeOpen ? "1000px" : "0",
              opacity: isTypeOpen ? "1" : "0",
              overflow: "hidden",
            }}
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="all"
                id="all"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <label htmlFor="all">All</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <label htmlFor="rent">Rent only</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <label htmlFor="sale">Sale only</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div
            className="flex items-center justify-between text-lg cursor-pointer"
            onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
          >
            <h5 className="font-bold mt-2">Amenities</h5>
            <FaChevronUp
              className={`transition-transform duration-200 ease-out ${
                !isAmenitiesOpen && "rotate-180"
              }`}
            />
          </div>
          <div
            className="ml-3 transition-all duration-200 ease-in-out"
            style={{
              maxHeight: isAmenitiesOpen ? "1000px" : "0",
              opacity: isAmenitiesOpen ? "1" : "0",
              overflow: "hidden",
            }}
          >
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-[14px] mt-[3px]"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="sort">Sort by:</label>
            <select
              name="sort_order"
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="rounded-md p-2 ml-2 bg-searchInput"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="regularPrice_desc">Price high to low</option>
            </select>
          </div>
          <button className="bg-ffc45d hover:opacity-60 text-white text-xl font-bold mt-3 p-2 w-full rounded-lg">
            Filter
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Listings</h1>
        <div className="py-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
                updateFavs={updateFavorites}
              />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-ffc45d hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllListings;
