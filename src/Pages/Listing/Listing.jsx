// import React from "react";

import { NavLink, Outlet } from "react-router-dom";
import "./Listing.css";
export default function Listing() {
  // const [switchListing, setSwitchListing] = useState(true);
  console.log("render")
  return (
    <section>
      {console.log("render")}
      <div
        className="flex justify-around p-3 font-bold text-[#F1843E] text-lg w-[35%] mx-auto bg-[#FEFBF6] mt-5 shadow-lg"
        style={{
          borderRadius: "25px", // Example gradient colors
        }}
      >
        <div>
          <NavLink to={""}>
            <span>Create List</span>
          </NavLink>
        </div>
        <div>
          <NavLink to={"allLists"}>
            <span>Show All Lists</span>
          </NavLink>
        </div>
      </div>
      <div className="flex flex-row  justify-center">

        {/* <div className="basis-1/6 bg-slate-400 flex flex-col justify-center gap-10 items-center">
          <div>
            <Link to={""}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Create List
              </button>
            </Link>
          </div>

          <div>
            <Link to={"allLists"}>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Show All Lists
              </button>
            </Link>
          </div>
        </div> */}
        <div className="">
{/* {switchListing ? {(<CreateListing />) }} */}
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
}
