import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const Footer = () => {
  return (
    <footer>
      <div className="footer-nav-wrapper">
        <Link
          to={process.env.PUBLIC_URL + "/home"}
          className="footer-nav-single"
        >
          <div className="menu-wrapper">
            <ReactSVG
              src={process.env.PUBLIC_URL + "/assets/img/icons/home.svg"}
            />
            <span>Home</span>
          </div>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + "/wishlist"}
          className="footer-nav-single"
        >
          <div className="menu-wrapper">
            <ReactSVG
              src={process.env.PUBLIC_URL + "/assets/img/icons/favourites.svg"}
            />
            <span>Favourites</span>
          </div>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + "/calendarview"}
          className="footer-nav-single"
        >
          <div className="menu-wrapper">
            <ReactSVG
              src={process.env.PUBLIC_URL + "/assets/img/icons/calendar.svg"}
            />
            <span>Calendar</span>
          </div>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + "/cart"}
          className="footer-nav-single"
        >
          <div className="menu-wrapper"> 
            <ReactSVG
              src={process.env.PUBLIC_URL + "/assets/img/icons/cart-big.svg"}
            />
            <span>Cart</span>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
