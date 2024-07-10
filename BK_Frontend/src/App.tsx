import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
