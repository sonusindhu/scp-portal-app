import { MenuItem, Select } from "@material-ui/core";
import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef((props: any, ref) => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const selectRef = useRef<HTMLSelectElement>(null);

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      onParentModelChanged(parentModel) {
        // When the filter is empty we will receive a null value here
        if (!parentModel && selectRef && selectRef.current) {
          selectRef.current.value = "";
          setCurrentValue("");
        } else if (selectRef && selectRef.current) {
          selectRef.current.value = parentModel.filter + "";
          setCurrentValue(parentModel.filter);
        }
      },
    };
  });

  const onChanged = (input: any) => {
    let operator: string | null = null;
    let keyword = null;
    if (input.target.value !== "") {
      operator = "contains";
      keyword = input.target.value;
    }
    setCurrentValue(input.target.value);
    props.parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged(operator, keyword);
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  const style = {
    width: "93%",
  };

  return (
    <Fragment>
      <Select
        ref={selectRef}
        value={currentValue}
        onChange={onChanged}
        displayEmpty
        style={style}
      >
        <MenuItem value="">Select</MenuItem>
        {props.column?.colDef?.dropdownData?.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </Fragment>
  );
});
