import React from "react";
import HanburgerMenu from "../HanburgerMenu";
import Logo from "../Logo";
import Menu from "../Menu";
import css from "./style.module.css";

const Toolbar = (props) => (
  <header className={css.Toolbar}>
    <HanburgerMenu toggleSideBar={props.toggleSideBar} />
    <Logo />
    <nav className={css.HideOnMobile}>
      <Menu />
    </nav>
  </header>
);

export default Toolbar;
