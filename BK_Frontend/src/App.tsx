import { ThemeProvider } from "@emotion/react";
import MiniDrawer from "./components/AppBar";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <MiniDrawer />
      </ThemeProvider>
    </>
  );
}

export default App;
