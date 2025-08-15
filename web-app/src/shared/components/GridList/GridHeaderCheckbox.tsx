import { Checkbox } from "@mui/material";
import React, { useState } from "react";

const GridHeaderCheckbox = (props) => {
  const [state, setState] = useState(false);

  const selectAllRows = (bool) => {
    props.api.forEachNode((row) => {
      props.api.getRowNode(row.id).setSelected(bool);
    });
  };

  const updateState = (e) => {
    setState(e.target.checked);
    selectAllRows(e.target.checked);
  };

  return (
    <div className="custom-header-checkbox">
      <Checkbox onChange={updateState} />
    </div>
  );
};

export default GridHeaderCheckbox;
