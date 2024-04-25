// import React from "react";

import { Link, Outlet } from "react-router-dom";
export default function Listing() {
  return (
    <section>
      <div className="flex flex-row">
        <div className="basis-1/6 bg-slate-400 flex flex-col justify-center gap-10 items-center">
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
        </div>
        <div className="basis-5/6">
          <Outlet></Outlet>
        </div>
      </div>
    </section>
  );
}
