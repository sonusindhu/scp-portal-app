import React from "react";
import GridActionMenu from "./grid-action-menu.component";

const PageHeading = (props) => {
  return (
    <header>
      <h3 className="heading">
        <span className="heading-title">{props.title}</span>
        {props.menus ? (
          <GridActionMenu
            className="heading-menu"
            menus={props.menus}
            menuCallback={props.menuCallback}
          />
        ) : (
          <></>
        )}
      </h3>
    </header>
  );
};

export default PageHeading;
