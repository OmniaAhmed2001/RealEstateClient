import React from "react";
import RiseLoader from "react-spinners/RiseLoader";

export default function Card({ icon, description, value }) {
  return (
    <div className="flex flex-wrap justify-center items-center bg-fefbf6 w-72 sm:w-80 h-80 my-28 relative rounded-2xl shadow-xl p-5">
      <div className="bg-fefbf6 p-7 rounded-full absolute mb-6 bottom-56">
        <img
          className="h-auto"
          style={{ width: "5rem" }}
          src={icon}
          alt="Icon"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className=" text-3xl font-semibold text-center mt-6">
          {description}
        </h1>
        {value ? (
        <p className="text-3xl font-bold text-ff9a62 text-center">{value}</p>) :
        <RiseLoader
          color="#FFB534"
          size={13}
          aria-label="Loading Spinner"
          data-testid="loader"
        />}
      </div>
    </div>
  );
}
