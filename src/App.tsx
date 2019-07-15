import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import blue from "@material-ui/core/colors/blue";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

function App() {
  const store = configureStore();
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Dashboard />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
