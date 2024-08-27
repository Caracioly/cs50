import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { AuthProvider } from "./context/AuthProvider";
import { AuthLayout } from "./context/AuthProvider/authLayout";

import { Toaster } from "sonner";

import { Exercises } from "./pages/exercices";
import { Register } from "@/pages/register";
import { NotFound } from "./pages/not-found";
import { Login } from "@/pages/login";
import { Greet } from "./pages/greet";
import { Sum } from "./pages/sum";
import { Ranking } from "./pages/ranking";
import { Average } from "./pages/average";
import { Vowel } from "./pages/vowel";

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
    path: "/ranking",
    element: (
      <AuthLayout>
        <Ranking />
      </AuthLayout>
    ),
  },
  {
    path: "exercises",
    element: (
      <AuthLayout>
        <Exercises />
      </AuthLayout>
    ),
  },
  {
    path: "/greet",
    element: (
      <AuthLayout>
        <Greet />
      </AuthLayout>
    ),
  },
  {
    path: "/sum",
    element: (
      <AuthLayout>
        <Sum />
      </AuthLayout>
    ),
  },
  {
    path: "/average",
    element: (
      <AuthLayout>
        <Average />
      </AuthLayout>
    ),
  },
  {
    path: "/vowel",
    element: (
      <AuthLayout>
        <Vowel />
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
