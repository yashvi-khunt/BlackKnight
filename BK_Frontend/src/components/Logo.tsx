import { Box } from "@mui/material";
import AppLogo from "../assets/Logo.png";
const Logo = () => {
  return (
    <Box
      component="img"
      sx={{
        width: "130px",
        m: "auto",
      }}
      alt="Black Knight Logo"
      src={AppLogo}
    />
  );
};

export default Logo;
