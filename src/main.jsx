import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../public/style.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ViewData from "./ViewData.jsx";
import HomePage from "./HomePage.jsx";
import App from "./App.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/viewData", element: <ViewData /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
