// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Egy</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <div className="sm:flex hidden">
          <ul className="flex gap-5 text-slate-700">
            <Link to={"/"}>
              <li className="hover:underline">Home</li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:underline">About</li>
            </Link>
            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  className="rounded-full h-7 w-7 object-cover"
                  alt="profile"
                />
              ) : (
                <li className="hover:underline">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
        <div className="sm:hidden relative">
          <FaBars
            className="text-slate-600 cursor-pointer"
            onClick={toggleMenu}
          />
          {showMenu && (
            <ul className="absolute bg-white top-full right-1 mt-3 p-2 rounded shadow-md w-20">
              <Link to={"/"}>
                <li className="mb-1">Home</li>
              </Link>
              <Link to={"/about"}>
                <li className="mb-1">About</li>
              </Link>
              <Link to={"/profile"}>
                {currentUser ? (
                  <img
                    src={currentUser.avatar}
                    className="rounded-full h-7 w-7 object-cover"
                    alt="profile"
                  />
                ) : (
                  <li className="hover:underline">Sign In</li>
                )}
              </Link>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
