// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChessKing } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ArrowIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    className="h-4 w-4 ml-2"
    fill="white"
  >
    <path d="M0,12A12,12,0,1,0,12,0,12.013,12.013,0,0,0,0,12Zm17.414-1.414a2,2,0,0,1,0,2.828l-4.243,4.243-1.414-1.414L15,13H6V11h9L11.757,7.757l1.414-1.414Z" />
  </svg>
);

const GoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="22"
    height="22"
    className="h-4 w-4 ml-2"
    fill="#FFB534"
  >
    <path d="M13.1,19a1,1,0,0,1-.7-1.71L17,12.71a1,1,0,0,0,0-1.42L12.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0L18.4,9.88a3,3,0,0,1,0,4.24l-4.59,4.59A1,1,0,0,1,13.1,19Z" />
    <path d="M6.1,19a1,1,0,0,1-.7-1.71L10.69,12,5.4,6.71a1,1,0,0,1,0-1.42,1,1,0,0,1,1.41,0l6,6a1,1,0,0,1,0,1.42l-6,6A1,1,0,0,1,6.1,19Z" />
  </svg>
);

const MyIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="h6 w-6"
    fill="#FFB534"
  >
    <path d="M22.849,7.68l-.869-.68h.021V2h-2v3.451L13.849,.637c-1.088-.852-2.609-.852-3.697,0L1.151,7.68c-.731,.572-1.151,1.434-1.151,2.363v13.957H8V15c0-1.105,.895-2,2-2h4c1.105,0,2,.895,2,2v9h8V10.043c0-.929-.42-1.791-1.151-2.363Z" />
  </svg>
);

export default function Home() {
  // const { token } = useSelector((state) => state.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [error, setError] = useState(null);
  const [propertyCount, setPropertyCount] = useState("");

  useEffect(() => {
    const propcount = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/listing/get/countListings`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Property count is not fetched");
        const listingsRes = await res.json();
        setPropertyCount(listingsRes.count);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    propcount();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 md:flex-row min-h-64">
        <div className="text-black text-center md:text-left md:w-1/2 md:pr-4 lg:pr-20 lg:pl-20">
          <h3
            className="flex items-center text-lg md:text-md lg:text-xl mb-4"
            style={{
              justifyContent: windowWidth < 768 ? "center" : "flex-start",
            }}
          >
            {MyIcon}
            <span className="ml-2 opacity-70">Real Estate Agency</span>
          </h3>

          <motion.h3
            initial={{
              y: 50,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-7"
          >
            Find your next <span className="text-ffcb74">perfect</span> place
            with ease
          </motion.h3>
          <div className="text-black opacity-70 text-sm md:text-lg mb-">
            EgyEstate will help you find your home fast, easy, and comfortable.
            <br />
            Our expert support is always available.
          </div>
          <div>
            <Link to="/listing">
              <button
                className="flex items-center text-base px-4 py-2 rounded-lg bg-ffb534 text-white font-bold mt-7 hover:bg-gradient-to-t from-ffcb74 via-ffc869 to-ffb534 transition-all duration-300 ease-in-out"
                style={{
                  justifyContent: windowWidth < 768 ? "center" : "flex-start",
                }}
              >
                Start Now {ArrowIcon}
              </button>
            </Link>
          </div>
        </div>
        <motion.div
          initial={{
            x: 70,
          }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-4 md:mt-0 md:w-1/2 md:pl-4 lg:pl-8"
        >
          <img
            src="/assets/HomePage_Pic-min2_50.webp"
            alt="House"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
      {/*Services Section */}
      <div className="flex flex-col justify-center items-center mt-16">
        <div className="rounded-xl p-2 bg-fdf5e8 flex flex-col justify-center items-center h-9 mb-4 w-36">
          <h2 className="text-center text-xl font-bold mb-4 mt-4 text-ffb534">
            Our Services
          </h2>
        </div>
        <h3 className="text-center text-3xl font-bold mb-8">Our Main Focus</h3>
        <div
          className="flex justify-center items-center flex-wrap mx-10"
          style={{ gap: "120px" }}
        >
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "340px" }}
          >
            <img
              src="/assets/Offer Logo.png"
              alt="offer"
              className="h-auto"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg">Recent Offers</p>
            <p className="text-center text-md text-black opacity-70">
              Over {propertyCount} homes for sale available on the website, we
              can match you with a house you will want to call home.
            </p>
            <Link to="/listing?searchTerm=&type=all&parking=false&furnished=false&offer=true&sort=created_at&order=desc">
              <button className="flex items-center justify-center text-sm sm:text-base px-3 mt-2 py-1 rounded-lg text-ffb534 font-bold hover:text-ffcb74 hover:translate-x-2 duration-75">
                Know More {GoIcon}
              </button>
            </Link>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "340px" }}
          >
            <img
              src="/assets\Rent Logo.png"
              alt="rent"
              className="h-auto"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg">Rent a home</p>
            <p className="text-center text-md text-black opacity-70">
              Over {propertyCount} homes for sale available on the website, we
              can match you with a house you will want to call home.
            </p>
            <Link to="/listing?searchTerm=&type=rent&parking=false&furnished=false&offer=false&sort=created_at&order=desc">
              <button className="flex items-center justify-center text-sm sm:text-base px-3 mt-2 py-1 rounded-lg text-ffb534 font-bold hover:text-ffcb74 hover:translate-x-2 duration-75">
                Find A Home {GoIcon}
              </button>
            </Link>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "340px" }}
          >
            <img
              src="/assets\Sell Logo.png"
              alt="sell"
              className="h-auto"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg">Sell a home</p>
            <p className="text-center text-md text-black opacity-70">
              Over {propertyCount} homes for sale available on the website, we
              can match you with a house you will want to call home.
            </p>
            <Link to="/user-listing">
              <button className="flex items-center justify-center text-sm sm:text-base px-3 mt-2 py-1 rounded-lg text-ffb534 font-bold hover:text-ffcb74 hover:translate-x-2 duration-75">
                Add Your Property {GoIcon}
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
      {/*Video Section */}
      <div className="mt-24 w-full">
        <h3 className="text-center text-3xl font-bold mt-7 mb-10">
          Unlock the door to your dream home
          <br />
          Welcome to <span className="text-ffcb74">luxury</span> living!
        </h3>
        <div className="w-full mb-16">
          <iframe
            src="https://www.youtube.com/embed/jPkBJY1KI_Q?si=cbn9AVT3jZTb-hMf"
            title="YouTube video player"
            width="100%"
            height="315"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
