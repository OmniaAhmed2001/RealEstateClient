// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseChimneyMedical,
  faHeart,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { AiFillDashboard } from "react-icons/ai";
import { FaSearch, FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/listing?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  if (location.pathname === "/not-found") return;
  return (
    <header className="bg-fdf5e8 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to={"/"} className="flex items-center">
          <h1 className="font-bold text-sm sm:text-xl flex-wrap md:flex hidden">
            <span className="text-ffcb74">Egy</span>
            <span className="text-ffb534">Estate</span>
          </h1>
          <img
            src="/assets/logo.png"
            alt="House"
            className="w-12 h-auto mt-1 ml-1"
          />
        </Link>
        
        <form
          className="bg-ffffff p-2 px-4 rounded-lg flex items-center"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-64748b" />
          </button>
        </form>
        <div className="sm:flex hidden">
          <ul className="flex items-center gap-5 text-64748b">
            
            <Link to={"/user-listing"}>
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
            {currentUser?.role === "admin" && (
              <Link to={"/dashboard"}>
                <li>
                  <AiFillDashboard
                    style={{ color: "orange", fontSize: "21px" }}
                  />
                </li>
              </Link>
            )}
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
          <AnimatePresence>
            {showMenu && (
              <motion.ul
                initial={{
                  y: -50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -50,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: "backInOut",
                }}
                className="absolute flex flex-col gap-2 items-center bg-white top-full right-1 mt-3 p-2 rounded shadow-md w-20 z-10"
              >
                <Link to={"/user-listing"}>
                  <li>
                    <FontAwesomeIcon
                      icon={faHouseChimneyMedical}
                      style={{ color: "orange" }}
                    />
                  </li>
                </Link>
                <Link to={"/favorites"}>
                  <li>
                    <FontAwesomeIcon
                      icon={faHeart}
                      style={{ color: "orange" }}
                    />
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
                {currentUser?.role === "admin" && (
                  <Link to={"/dashboard"}>
                    <li>
                      <AiFillDashboard
                        style={{ color: "orange", fontSize: "20px" }}
                      />
                    </li>
                  </Link>
                )}
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
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
