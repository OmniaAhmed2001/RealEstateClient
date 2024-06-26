import React, { useEffect, useState } from "react";
import { FaBath, FaBed, FaHeart } from "react-icons/fa";
import { MdOutlineMoneyOff } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const ListingItem = ({ listing, updateFavs }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [fav, setFav] = useState(
    () => !!currentUser?.favorites?.find((f) => f === listing._id)
  );

  const toggleFav = () => {
    updateFavs(listing._id);
    setFav(!fav);
  };

  return (
    <div className="bg-card shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative">
      {currentUser && (
        <div
          role="button"
          className="absolute flex items-center gap-1 right-5 top-5 rounded-full bg-white p-1 z-20 group"
          onClick={toggleFav}
        >
          {fav ? (
            <>
              <p className="text-ff9a62 font-semibold text-sm hidden group-hover:block">
                Remove from favorites
              </p>
              <AiFillHeart className="h-5 w-5 text-ff9a62" />
            </>
          ) : (
            <>
              <p className="text-ff9a62 text-sm hidden group-hover:block">
                Add to favorites
              </p>
              <CiHeart className="h-5 w-5 text-ff9a62" />
            </>
          )}
        </div>
      )}
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[280px] sm:h-[180px] w-full object-cover hover:scale-105 transition-scale duration-300 z-0"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-2xl font-semibold text-black">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FaLocationDot className="h-5 w-5 text-ff9a62" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address.street}, {listing.address.city},{" "}
              {listing.address.country}
            </p>
          </div>
          {/* <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p> */}
          <p className="text-black font-semibold text-xl">
            
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")} {" EGP"}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-white flex gap-4 w-full">
            <div className="flex gap-2 items-center rounded-full bg-ff9a62 px-2 py-1">
              <FaBed className="text-lg" />
              <div className="font-bold text-sm">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </div>
            </div>
            <div className="flex gap-2 items-center rounded-full bg-ff9a62 px-2 py-1">
              <FaBath className="text-lg" />
              <div className="font-bold text-sm">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </div>
            </div>
            {listing.offer && (
              <div className="flex ml-auto items-center justify-center rounded-full px-2 py-1 bg-green-600">
                <MdOutlineMoneyOff className="text-lg " />
                <p className="font-semibold text-sm">Offer</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
