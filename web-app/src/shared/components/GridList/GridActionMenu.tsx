import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

import { MenuItem as MenuItemModel } from "../../models/MenuItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GridActionMenuProps{
  className: string,
  menus: MenuItemModel[],
  menuCallback?: Function
  disabled?: boolean,
  data?: any,
}

const GridActionMenu = (props: GridActionMenuProps) => {
  const [open, setOpen] = useState(false);

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="more"
            className="action-icon inline-flex items-center justify-center p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!props.menus || props.menus.length === 0 || props.disabled}
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>

        {props.menus && props.menus.length > 0 && (
          <DropdownMenuContent 
            align="end"
            className="w-[20ch] max-h-[216px] overflow-auto"
          >
            {props.menus.map((menu: MenuItemModel) => (
              <DropdownMenuItem
                key={menu.key}
                disabled={menu.disabled}
                onClick={($event) => actionEvent($event, menu)}
              >
                {menu.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </span>
  );
};

export default GridActionMenu;
