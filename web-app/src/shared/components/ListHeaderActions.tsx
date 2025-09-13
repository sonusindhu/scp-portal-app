import React from "react";
import { Button } from "@mui/material";

const ListHeaderActions = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  onCreate,
  createLabel = "Create",
  children = null,
}) => (
  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
    <input
      value={searchValue ?? ''}
      onChange={e => onSearchChange(e.target.value)}
      placeholder={searchPlaceholder}
      style={{ padding: "8px", width: "220px" }}
    />
    <Button
      className="blue-btn m-r-20"
      type="button"
      size="large"
      variant="contained"
      onClick={onCreate}
    >
      {createLabel}
    </Button>
    {children}
  </div>
);

export default ListHeaderActions;
