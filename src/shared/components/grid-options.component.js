import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;
const GridOptions = (props) => {
  console.log(props);

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

  const actionEvent = (event, menu) => {
    const data = props.data;
    const eventData = {
      event,
      data,
      menu,
    };
    setOpen(false);
    menu?.action(eventData);
  };

  return (
    <span>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
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
        {props.menus.map((menu) => (
          <MenuItem
            key={menu.key}
            onClick={($event) => actionEvent($event, menu)}
          >
            {menu.title}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
};

export default GridOptions;
