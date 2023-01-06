/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./style.css";
import logotp from "./logo.svg";
import { Link } from "react-router-dom";

function Logo({ className, href, ...props }) {
  const hrefValue = href ? href : null;
  return hrefValue ? (
    <Link
      to={{ pathname: hrefValue }}
      className={className ? className : "logo"}
      {...props}
    >
      <img src={logotp} alt="Логотип магазина" className="logo_pic" />
    </Link>
  ) : (
    <a href="#" className={className ? className : "logo"} {...props}>
      <img src={logotp} alt="Логотип магазина" className="logo_pic" />
    </a>
  );
}

export default Logo;
