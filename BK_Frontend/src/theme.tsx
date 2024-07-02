import { Theme, createTheme } from "@mui/material";

// Augment the palette to include a violet color
declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white: PaletteOptions["primary"];
  }
}

//Update the AppBar's color options to include a white option
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    white: true;
  }
}

// Update the Button's color options to include a violet option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#D9D9D9",
      light: "#E0E0E0",
      contrastText: "#000000",
    },
    white: {
      main: "#ffffff",
    },
  },
  typography: { fontFamily: "Inter" },
});

export default theme;
