import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  severity: AlertColor; // Changed to AlertColor
  message: string;
}

const initialState: SnackbarState = {
  open: false,
  severity: "info",
  message: "",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(state, action) {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    closeSnackbar(state) {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
