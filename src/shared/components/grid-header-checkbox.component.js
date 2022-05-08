import { Checkbox } from "@mui/material";
import { ComponentElement, useState } from "react";
// import { Component } from "ag-grid-community";

const GridHeaderCheckbox = (props) => {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       checked: false,
  //     };
  //   }

  const [state, setState] = useState(false);

  const selectAllRows = (bool) => {
    console.log(bool);
    props.api.forEachNode((row) => {
      props.api.getRowNode(row.id).selectThisNode(bool);
    });
  };

  const updateState = (e) => {
    console.log(e.target.checked);
    setState(e.target.checked);
    selectAllRows(e.target.checked);
    // if (e.target.checked) selectAllRows(e.target.checked);
    // if (!e.target.checked) selectAllRows(false);
  };

  return (
    <div className="custom-header-checkbox">
      {/* <input type="checkbox" defaultChecked={state} onChange={updateState} /> */}

      <Checkbox onChange={updateState} />
    </div>
  );
};

export default GridHeaderCheckbox;
