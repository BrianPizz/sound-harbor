import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import "./index.css";
import SignUp from "./pages/SignUpPage.jsx";
import Login from "./pages/LoginPage.jsx";
import Cart from "./pages/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "category/:categoryId",
        element: <CategoryPage />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
