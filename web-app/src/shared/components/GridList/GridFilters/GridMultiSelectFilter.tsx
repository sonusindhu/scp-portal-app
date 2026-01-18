import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";

export default forwardRef((props: any, ref) => {
  const [currentValue, setCurrentValue] = useState<string>("");

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      onParentModelChanged(parentModel) {
        // When the filter is empty we will receive a null value here
        if (!parentModel) {
          setCurrentValue("");
        } else {
          setCurrentValue(parentModel.filter + "");
        }
      },
    };
  });

  const onChanged = (value: string) => {
    let operator: string | null = null;
    let keyword: string | null = null;
    if (value !== "") {
      operator = "contains";
      keyword = value;
    }
    setCurrentValue(value);
    props.parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged(operator, keyword);
    });
  };

  return (
    <Fragment>
      <Select value={currentValue} onValueChange={onChanged}>
        <SelectTrigger className="multi-select-filter">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {props.column?.colDef?.dropdownData?.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Fragment>
  );
});
