// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyMedical,
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
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
    <header className="bg-fdf5e8 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-ffcb74">Egy</span>
            <span className="text-ffb534">Estate</span>
          </h1>
        </Link>
        <form className="bg-ffffff p-2 px-4 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-64748b" />
        </form>
        <div className="sm:flex hidden">
          <ul className="flex gap-5 text-64748b">
            <Link to={"/listing"}>
              <li>
                <FontAwesomeIcon
                  icon={faHouseChimneyMedical}
                  style={{ color: "orange" }}
                />
              </li>
            </Link>
            <Link to={"/favorites"}>
              <li>
                <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
              </li>
            </Link>
            <Link to={"/about"}>
              <li>
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  style={{ color: "orange" }}
                />
              </li>
            </Link>
            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  className="rounded-full h-7 w-7 object-cover"
                  alt="profile"
                />
              ) : (
                <div className="bg-ffb534 px-5 py-custom text-ffffff rounded-xl">
                  <li>Sign In</li>
                </div>
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
              <Link to={"/listing"}>
                <li>
                  <FontAwesomeIcon
                    icon={faHouseChimneyMedical}
                    style={{ color: "orange" }}
                  />
                </li>
              </Link>
              <Link to={"/favorites"}>
                <li>
                  <FontAwesomeIcon icon={faHeart} style={{ color: "orange" }} />
                </li>
              </Link>
              <Link to={"/about"}>
                <li>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ color: "orange" }}
                  />
                </li>
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
