import { useSnackbar } from "notistack";

let useSnackbarRef = null;
export const SnackbarUtilConfig = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const snackActions = {
  success(msg, options) {
    this.toast(msg, { ...options, variant: "success" });
  },
  warning(msg, options) {
    this.toast(msg, { ...options, variant: "warning", persist: true });
  },
  info(msg, options) {
    this.toast(msg, { ...options, variant: "info" });
  },
  error(msg, options) {
    this.toast(msg, { ...options, variant: "error" });
  },
  toast(msg, options) {
    useSnackbarRef?.enqueueSnackbar(msg, options);
  },
  close(key) {
    useSnackbarRef?.closeSnackbar(key);
  },
};

export default snackActions;
