import React from "react";
import css from "./style.module.css";
import LogoImage from "../../Assets/Images/burger-logo.png";

const Logo = () => (
  <div className={css.Logo}>
    <img src={LogoImage} alt=""></img>
  </div>
);
export default Logo;
