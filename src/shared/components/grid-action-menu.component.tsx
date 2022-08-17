import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { MenuItem as MenuItemModel } from "../../shared/models/MenuItem";

interface GridActionMenuProps{
  className: string,
  menus: MenuItemModel[],
  menuCallback?: Function
  disabled?: boolean,
  data?: any,
}

const ITEM_HEIGHT = 48;
const GridActionMenu = (props: GridActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const actionEvent = (event, menu: MenuItemModel) => {
    const data = props.data;
    const eventData = {
      event,
      data,
      menu,
    };
    setOpen(false);
    props.menuCallback && props.menuCallback(eventData);
  };

  return (
    <span className={props.className}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        className="action-icon"
        onClick={handleClick}
        disabled={!props.menus || props.menus.length === 0 || props.disabled}
      >
        <MoreVertIcon />
      </IconButton>

      {props.menus && props.menus.length > 0 ? (
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {props.menus.map((menu: MenuItemModel) => (
            <MenuItem
              disabled={menu.disabled}
              key={menu.key}
              onClick={($event) => actionEvent($event, menu)}
            >
              {menu.title}
            </MenuItem>
          ))}
        </Menu>
      ) : (
        ""
      )}
    </span>
  );
};

export default GridActionMenu;
