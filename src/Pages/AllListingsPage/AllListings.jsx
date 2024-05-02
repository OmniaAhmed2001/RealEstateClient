import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

const AllListings = () => {
  const [isTypeOpen, setIsTypeOpen] = useState(true);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(true);
  return (
    <div className="flex flex-col md:flex-row m-5">
      <div className="p-5 bg-filter rounded-xl mb-5 md:mb-0 md:mr-5">
        <form>
          <div className="bg-searchInput flex items-center gap-2 p-2 rounded-lg">
            <FaSearch className="text-64748b" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>
          <button type="reset" className="bg-transparent text-sky-600 my-2">
            Clear all
          </button>
          <div
            className="flex items-center justify-between text-lg cursor-pointer"
            onClick={() => setIsTypeOpen(!isTypeOpen)}
          >
            <h5 className="font-bold">Type</h5>
            <FaChevronDown />
          </div>
          {isTypeOpen && (
            <div className="ml-3">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  className="w-[14px] mt-[3px]"
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  className="w-[14px] mt-[3px]"
                />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-[14px] mt-[3px]"
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
          )}
          <div
            className="flex items-center justify-between text-lg cursor-pointer"
            onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
          >
            <h5 className="font-bold mt-2">Amenities</h5>
            <FaChevronDown />
          </div>
          {isAmenitiesOpen && (
            <div className="ml-3">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-[14px] mt-[3px]"
                />
                <label htmlFor="parking">Parking</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-[14px] mt-[3px]"
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
            </div>
          )}
          <div className="mt-3">
            <label htmlFor="sort">Sort by:</label>
            <select
              name="sort"
              id="sort"
              className="rounded-md p-2 ml-2 bg-searchInput"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="price-low-high">Price low to high</option>
              <option value="price-high-low">Price high to low</option>
            </select>
          </div>
          <button className="bg-ffc45d hover:opacity-60 text-white text-xl font-bold mt-3 p-2 w-full rounded-lg">
            Filter
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Listings</h1>
      </div>
    </div>
  );
};

export default AllListings;
