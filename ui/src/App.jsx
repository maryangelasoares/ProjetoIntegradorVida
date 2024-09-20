import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./App.scss";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registro from "./pages/Registros";

import { useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";

const App = () => {
  const { logged } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={logged ? (<Layout />) : (<Navigate to="/login" />)}
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registros" element={<Registro />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
