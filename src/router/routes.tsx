import React from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/layout/Layout";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Departments from "../pages/Departments";
import Questionnaire from "../pages/Questionnaire";
import Results from "../pages/Results";
import Profile from "../pages/Profile";
import CareerDetail from "../pages/CareerDetail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/departments",
    element: (
      <ProtectedRoute>
        <Departments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/questionnaire/:departmentId",
    element: (
      <ProtectedRoute>
        <Questionnaire />
      </ProtectedRoute>
    ),
  },
  {
    path: "/results/:questionnaireId",
    element: (
      <ProtectedRoute>
        <Results />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/career/:careerId",
    element: (
      <ProtectedRoute>
        <CareerDetail />
      </ProtectedRoute>
    ),
  },
];
