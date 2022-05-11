import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export default forwardRef((props, ref) => {
  console.log(props);
  const [currentValue, setCurrentValue] = useState(null);
  const inputRef = useRef(null);

  // expose AG Grid Filter Lifecycle callbacks
  useImperativeHandle(ref, () => {
    return {
      onParentModelChanged(parentModel) {
        // When the filter is empty we will receive a null value here
        if (!parentModel) {
          inputRef.current.value = "";
          setCurrentValue(null);
        } else {
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

    setCurrentValue(Number(input.target.value));
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
        onInput={onInputBoxChanged}
      />
    </Fragment>
  );
});
