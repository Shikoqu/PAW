import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import { AuthProvider } from "./utils/authProvider";
import PR from "./components/PrivateRoute";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

import RootLayout from "./pages/RootLayout";
import TourList, { loader as ToursLoader } from "./pages/TourList";
import AddTour from "./pages/AddTour";
import TourDetails, { loader as detailsLoader } from "./components/TourDetails";
import HomePage from "./pages/HomePage";
import UsersPage, { loader as usersLoader } from "./pages/Users";

const router = createBrowserRouter([
  {
    path: "auth",
    element: null,
    children: [
      { path: "signin", element: <SigninPage /> },
      { path: "signup", element: <SignupPage /> },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "tours",
        element: (
          <PR>
            <TourList />
          </PR>
        ),
        loader: ToursLoader,
        children: [{ path: "add", element: <AddTour /> }],
      },
      {
        path: "tour/:id",
        element: <TourDetails />,
        loader: detailsLoader,
      },
      { path: "users", element: <UsersPage />, loader: usersLoader },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
