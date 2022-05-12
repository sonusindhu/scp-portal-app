import { Checkbox } from "@mui/material";
import { ComponentElement, useState } from "react";
// import { Component } from "ag-grid-community";

const GridHeaderCheckbox = (props) => {
  const [state, setState] = useState(false);

  const selectAllRows = (bool) => {
    props.api.forEachNode((row) => {
      props.api.getRowNode(row.id).selectThisNode(bool);
    });
  };

  const updateState = (e) => {
    setState(e.target.checked);
    selectAllRows(e.target.checked);
  };

  return (
    <div className="custom-header-checkbox">
      <Checkbox onChange={updateState} />
      {props.displayName}
    </div>
  );
};

export default GridHeaderCheckbox;
