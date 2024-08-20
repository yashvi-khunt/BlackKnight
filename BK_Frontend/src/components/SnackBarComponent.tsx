import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../redux/slice/snackbarSlice";
import { Alert, Snackbar } from "@mui/material";
import { RootState } from "../redux/store";

const SnackBarComponent = () => {
  const { open, severity, message } = useSelector(
    (state: RootState) => state.snackbar
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
