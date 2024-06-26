declare module "@mui/material/styles" {
  interface Palette {
    companyWhite: Palette["augmentColor"];
  }
  interface PaletteOptions {
    white: PaletteOptions["companyWhite"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    companyWhite: true;
  }
}
