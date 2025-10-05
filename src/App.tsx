import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { routes } from "./router/routes";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
