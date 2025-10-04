import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./router/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {/* Varsayılan route'u dashboard'a yönlendir */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
