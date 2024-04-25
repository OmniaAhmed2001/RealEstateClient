import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFacebookSquare,
  faYoutube,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";



const Footer = () => {
  return (
    <div>
      
      <span>Footer</span>
      <FontAwesomeIcon icon={faFacebookSquare} style={{ color: "orange" }} />
      <FontAwesomeIcon icon={faYoutube} style={{ color: "orange" }} />
      <FontAwesomeIcon icon={faLinkedin} style={{ color: "orange" }} />
      <FontAwesomeIcon icon={faInstagram} style={{ color: "orange" }} />
    </div>
  );
};

export default Footer;
