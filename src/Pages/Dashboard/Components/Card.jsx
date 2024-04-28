import React from "react";

export default function Card(icon, description, value) {
  async function GetAllEstates() {
    const data = await fetch("");
  }

  return (
    <>
      <div className="flex">
        <div className="flex flex-col justify-center items-center bg-fefbf6 w-72 h-80 m-28 relative rounded-2xl shadow-xl">
          <div className="bg-fefbf6 p-7 rounded-full absolute mb-6 bottom-56">
            <img src="public/assets/image 9.png" />
          </div>
          <div className="flex flex-col items-center justify-center gap-9">
            <h1 className="text-3xl font-semibold">Total Real Estates</h1>
            <p className="text-4xl font-bold text-ff9a62">2500</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-fefbf6 w-72 h-80 m-28 relative rounded-2xl shadow-xl">
          <div className="bg-fefbf6 p-7 rounded-full absolute mb-6 bottom-56">
            <img src="public/assets/image 9.png" />
          </div>
          <div className="flex flex-col items-center justify-center gap-9">
            <h1 className="text-3xl font-semibold">Total Real Estates</h1>
            <p className="text-4xl font-bold text-ff9a62">2500</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-fefbf6 w-72 h-80 m-28 relative rounded-2xl shadow-xl">
          <div className="bg-fefbf6 p-7 rounded-full absolute mb-6 bottom-56">
            <img src="public/assets/image 9.png" />
          </div>
          <div className="flex flex-col items-center justify-center gap-9">
            <h1 className="text-3xl font-semibold">Total Real Estates</h1>
            <p className="text-4xl font-bold text-ff9a62">2500</p>
          </div>
        </div>
      </div>
    </>
  );
}
