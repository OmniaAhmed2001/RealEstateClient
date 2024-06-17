import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChessKing } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <div className="flex flex-col justify-center items-center py-10 min-h-80">
        <div className="rounded-xl p-2 bg-fdf5e8 flex flex-col justify-center items-center h-9 mb-4 w-32">
          <h2 className="text-center text-xl font-bold mb-4 mt-4 text-ffb534">
            About Us
          </h2>
        </div>
        <h3 className="text-center text-3xl font-bold mb-8">
          Welcome to
          <span>
            <span className="text-ffcb74"> Egy</span>
            <span className="text-ffb534">Estate</span>
          </span>
        </h3>

        <div
          className="flex justify-center items-center flex-wrap mx-11 mb-14 mt-20"
          style={{ gap: "100px" }}
        >
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "300px" }}
          >
            <img
              src="assets/partners.png"
              alt="offer"
              className="h-auto mb-2"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg mb-2">
              Your Real Estate Partner
            </p>
            <p className="text-center text-md text-black opacity-70">
              EgyEstate specializes in real estate services for buying, selling,
              and renting properties in prime locations.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "300px" }}
          >
            <img
              src="assets/expert.png"
              alt="rent"
              className="h-auto mb-2"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg mb-2">
              Our Expertise
            </p>
            <p className="text-center text-md text-black opacity-70">
              With a wealth of industry knowledge, EgyEstate is your trusted
              partner in navigating the real estate market.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col justify-center items-center p-3 bg-fdf5e8 bg-opacity-40 rounded-md shadow-md hover:shadow-lg-hover"
            style={{ width: "290px", height: "300px" }}
          >
            <img
              src="/assets/mission.png"
              alt="sell"
              className="h-auto mb-2"
              style={{ width: "5rem" }}
            />
            <p className="text-center mt-2 font-bold text-lg mb-2">
              Our Mission
            </p>
            <p className="text-center text-md text-black opacity-70">
              Our mission is to help clients achieve their real estate goals
              through dedicated service, guiding them through buying, selling,
              or renting.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
