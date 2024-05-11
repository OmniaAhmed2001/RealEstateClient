import AllLists from "../AllLists/AllLists";
import CreateListing from "../Create-Listing/Create-Listing";
import "./UserListing.css";
import { useState } from "react";
export default function Listing() {
  const [switchListing, setSwitchListing] = useState(true);
  console.log("render");
  return (
    <section>
      {/* {console.log("render")} */}
      <div
        className="flex items-center justify-around p-3 font-bold text-ffb534 text-lg lg:w-[35%] md:w-[45%] sm:w-[75%] mx-auto bg-[#FEFBF6] mt-5 shadow-lg"
        style={{
          borderRadius: "25px",
        }}
      >
        <div
          role="button"
          onClick={() => {
            setSwitchListing(true);
          }}
          className={switchListing && "active"}
        >
          <p to={""}>
            <span>Create List</span>
          </p>
        </div>
        <div
          role="button"
          onClick={() => {
            setSwitchListing(false);
          }}
          className={!switchListing && "active"}
        >
          <p to={"allLists"}>
            <span>Show All Lists</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row  justify-center">
        <div className="">
          {switchListing ? (
            <CreateListing></CreateListing>
          ) : (
            <AllLists></AllLists>
          )}
        </div>
      </div>
    </section>
  );
}
