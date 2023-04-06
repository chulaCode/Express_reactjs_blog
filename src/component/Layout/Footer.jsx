import React from "react";
import Logo from "../../img/logo1.jpg";
import Placeholder from 'react-bootstrap/Placeholder';


const Footer = () => {
  return (
    <Placeholder as="p" animation="wave" bg="primary">
        
    <footer className="bg-primary">
      <img src={Logo} alt="" />
      <span className="text-white">
        Developed with ♥️ by <b>codeChula</b>.
      </span>
    </footer>
    </Placeholder>
  );
};

export default Footer;