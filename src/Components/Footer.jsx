import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookSquare,
  faYoutube,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col items-center" style={{ width: "100%" }}>
      <div
        className="flex flex-col items-center gap-3 justify-center"
        style={{ background: "#fdf5e8", width: "100%", minHeight: "12rem" }}
      >
        <div className="flex gap-2">
          <Link>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              size="2x"
              style={{ color: "#ffcb74" }}
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
              style={{ color: "#ffcb74" }}
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              style={{ color: "#ffcb74" }}
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
              style={{ color: "#ffcb74" }}
            />
          </Link>
        </div>
        <Link to={"/"}>
          <h1 className="font-bold text-4xl flex flex-wrap">
            <span style={{ color: "#ffcb74" }}>Egy</span>
            <span className="text-slate-700" style={{ color: "#ffb534" }}>
              Estate
            </span>
          </h1>
        </Link>
        <p className=" text-xl tracking-wide" style={{ color: "#8c8780" }}>
          Call us on | 01587363687
        </p>
      </div>
      <div
        className="flex justify-center items-center"
        style={{ background: "#ffcb74", minHeight: "5rem", minWidth: "100%" }}
      >
        <p style={{ color: "#b09972" }}>
          EgyEstate Real Estate - All rights reserved 2024 ©
        </p>
      </div>
    </div>
  );
};

export default Footer;
