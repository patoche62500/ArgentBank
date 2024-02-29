import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../../pages/layout";
import Home from "../../pages/home/home.jsx";
import Sign, { action as signInAction } from "../../pages/sign/sign.jsx";
import User, { loader as loaderUser } from "../../pages/user/user.jsx";

// Configuration du routeur normal pour le site en ligne
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <User />,
        loader: loaderUser,
      },
      {
        path: "/sign",
        element: <Sign />,
        action: signInAction,
      },
    ],
  },
]);

// Fonction pour gérer le choix entre le mode maintenance et le mode normal
export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
