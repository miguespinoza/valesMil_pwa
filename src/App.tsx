import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Dashboard from "./components/Dashboard";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Dashboard/>
    </Provider>
  );
}

export default App;
