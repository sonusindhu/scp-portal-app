import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef((props: any, ref) => {
  const [, setCurrentValue] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      onParentModelChanged(parentModel) {
        // When the filter is empty we will receive a null value here
        if (!parentModel && inputRef && inputRef.current) {
          inputRef.current.value = "";
          setCurrentValue(null);
        } else if(inputRef && inputRef.current) {
          inputRef.current.value = parentModel.filter + "";
          setCurrentValue(parentModel.filter);
        }
      },
    };
  });

  const onInputBoxChanged = (input) => {
    if (input.target.value === "") {
      // Remove the filter
      props.parentFilterInstance((instance) => {
        instance.onFloatingFilterChanged(null, null);
      });
      return;
    }

    setCurrentValue(input.target.value);
    props.parentFilterInstance((instance) => {
      instance.onFloatingFilterChanged("contains", input.target.value);
    });
  };

  const style = {
    width: "93%",
  };

  return (
    <Fragment>
      <input
        ref={inputRef}
        style={style}
        type="text"
        className="text-filter"
        placeholder="Search"
        onInput={onInputBoxChanged}
      />
    </Fragment>
  );
});
