// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Card({ icon, description, value }) {
  return (
    <div className="flex flex-col justify-center items-center bg-fefbf6 w-full md:w-72 h-80 m-4 md:m-28 relative rounded-2xl shadow-xl">
      <div className="bg-fefbf6 p-7 rounded-full absolute mb-6 bottom-56">
        <img src={{ icon }} alt="Icon" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 md:gap-9">
        <h1 className="text-xl md:text-3xl font-semibold">{description}</h1>
        <p className="text-2xl md:text-4xl font-bold text-ff9a62">{value}</p>
      </div>
    </div>
  );
}
