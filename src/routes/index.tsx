import { createBrowserRouter } from "react-router-dom";
import { Users } from "../views/home";
import HomeLayout from "@/layouts/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
    ],
  },
]);
