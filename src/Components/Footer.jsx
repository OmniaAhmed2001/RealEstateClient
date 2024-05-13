// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faFacebookSquare,
//   faYoutube,
//   faLinkedin,
//   faInstagram,
// } from "@fortawesome/free-brands-svg-icons";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <div className="flex flex-col justify-center items-center" style={{ width: "100%" }}>
//       <div className="flex items-center justify-between bg-fdf5e8 w-full py-8 px-4">
//         <div className="flex flex-col items-start">
//           <Link to={"/"}>
//             <h1 className="font-bold text-4xl flex flex-wrap">
//             <span style={{ color: "#ffcb74" }}>Egy</span>
//             <span className="text-slate-700" style={{ color: "#ffb534" }}>Estate</span>
              
//             </h1>
//           </Link>
//         </div>
//         <div className="flex flex-grow justify-between items-center gap-4">
//           <Link to={"/user-listing"} className="text-yellow-500 hover:text-yellow-600">Add a Property</Link>
//           <Link to={"/favorites"} className="text-yellow-500 hover:text-yellow-600">Favorites</Link>
//           <Link to={"/about"} className="text-yellow-500 hover:text-yellow-600">About Us</Link>
//         </div>
//         <div className="flex gap-4">
//           <text className="text-yellow-500">Follow Us</text>
//           <Link>
//             <FontAwesomeIcon
//               icon={faInstagram}
//               size="x"
//               style={{ color: "#ffcb74" }}
//             />
//           </Link>
//         </div>
//       </div>
//       <div className="bg-ffcb74 text-slate-100 w-full py-2 px-4 text-center">
//         <p>EgyEstate Real Estate - All rights reserved 2024 ©</p>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center" style={{ width: "100%" }}>
      <div className="flex flex-col bg-fdf5e8 w-full py-8 px-4 md:flex-row md:justify-between">
        <div className="flex flex-col items-start mb-4 md:mb-0 md:flex-shrink-0">
          <Link to={"/"}>
            <h1 className="font-bold text-4xl flex flex-wrap">
              <span style={{ color: "#ffcb74" }}>Egy</span>
              <span style={{ color: "#ffb534" }}>Estate</span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:items-center md:gap-4">
          <Link to={"/user-listing"} className="text-yellow-500 hover:text-yellow-600 mb-2 md:mb-0">Add a Property</Link>
          <Link to={"/favorites"} className="text-yellow-500 hover:text-yellow-600 mb-2 md:mb-0">Favorites</Link>
          <Link to={"/about"} className="text-yellow-500 hover:text-yellow-600 mb-2 md:mb-0">About Us</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">Follow Us</span>
          <a href="https://www.instagram.com/egyestate_co/" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <FontAwesomeIcon
              icon={faInstagram}
              size="lg"
              className="text-yellow-500"
            />

          </a>
        </div>
      </div>
      <div className="flex justify-center bg-ffcb74 text-slate-100 w-full py-2 px-4">
        <p>EgyEstate - All rights reserved 2024 ©</p>
      </div>
    </div>
  );
};

export default Footer;
