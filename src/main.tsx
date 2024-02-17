import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./components/userProfile/userProfile.tsx";
import PageDoesNotExist from "./components/errorWidget/errorBoundary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageDoesNotExist />,
  },
  {
    path: "/:username",
    element: <UserProfile />,
    errorElement: <PageDoesNotExist />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
