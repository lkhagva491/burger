import React from "react";
import Shadow from "../General/Shadow";
import Logo from "../Logo";
import Menu from "../Menu";
import css from "./style.module.css";

const SideBar = (props) => {
  let classes = [css.SideBar, css.CloseSideBar];

  if (props.showSideBar) classes = [css.SideBar, css.OpenSideBar];

  return (
    <div>
      <Shadow show={props.showSideBar} onClicked={props.toggleSideBar} />
      <div className={classes.join(" ")} onClick={props.toggleSideBar}>
        <div className={css.Logo}>
          <Logo />
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SideBar;
