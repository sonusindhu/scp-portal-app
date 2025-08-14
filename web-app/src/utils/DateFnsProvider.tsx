import React, { FC } from "react";

import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export type DateFnsProviderProps = FC<
  Omit<LocalizationProviderProps<any, any>, "dateAdapter"> & {
    utils?: any; // Optional override for legacy or compatibility
  }
>;

const DateFnsProvider: DateFnsProviderProps = ({
  children,
  utils,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} {...props}>
      {children}
    </LocalizationProvider>
  );
};
export default DateFnsProvider;
