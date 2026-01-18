import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const GridHeaderCheckbox = (props) => {
  const [, setState] = useState(false);

  const selectAllRows = (bool) => {
    props.api.forEachNode((row) => {
      props.api.getRowNode(row.id).setSelected(bool);
    });
  };

  const updateState = (checked) => {
    setState(checked);
    selectAllRows(checked);
  };

  return (
    <div className="custom-header-checkbox">
      <Checkbox onCheckedChange={updateState} />
    </div>
  );
};

export default GridHeaderCheckbox;
