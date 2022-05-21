import { OptionsObject, SnackbarKey, useSnackbar, WithSnackbarProps } from 'notistack'
import React from 'react'

let useSnackbarRef: WithSnackbarProps
export const SnackbarUtilConfig: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

const toastService = {
  success(msg: string, options?: OptionsObject) {
    this.toast(msg, { ...options, variant: "success" });
  },
  warning(msg: string, options?: OptionsObject) {
    this.toast(msg, { ...options, variant: "warning", persist: true });
  },
  info(msg: string, options?: OptionsObject) {
    this.toast(msg, { ...options, variant: "info" });
  },
  error(msg: string, options?: OptionsObject) {
    this.toast(msg, { ...options, variant: "error" });
  },
  toast(msg: string, options?: OptionsObject) {
    useSnackbarRef?.enqueueSnackbar(msg, options);
  },
  close(key?: SnackbarKey) {
    useSnackbarRef?.closeSnackbar(key);
  },
};

export default toastService;
