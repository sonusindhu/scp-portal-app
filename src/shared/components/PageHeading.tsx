import React, { ReactElement } from "react";
import { MenuItem } from "../models/MenuItem";
import GridActionMenu from "./grid-action-menu.component";

interface PageHeadingModel {
  title: string;
  menuCallback?: Function;
  menus?: MenuItem[];
  children?: ReactElement;
}

const PageHeading = (props: PageHeadingModel) => {
  return (
    <header>
      <h3 className="heading">
        <span className="heading-title">{props.title}</span>

        <div className="right-menu">
          {props.children ? props.children : ""}

          {props.menus ? (
            <GridActionMenu
              className="heading-menu"
              menus={props.menus}
              menuCallback={props.menuCallback}
            />
          ) : (
            <></>
          )}
        </div>
      </h3>
    </header>
  );
};

export default PageHeading;
