import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { AuthProvider } from "./context/AuthProvider";
import { AuthLayout } from "./context/AuthProvider/authLayout";

import { Toaster } from "sonner";

import { Login } from "@/pages/login";
import { Register } from "@/pages/register";
import { Greet } from "./pages/greet";
import { NotFound } from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/greet",
    element: (
      <AuthLayout>
        <Greet />
      </AuthLayout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster invert richColors />
    </AuthProvider>
  </StrictMode>
);
