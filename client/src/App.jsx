import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

import Authprovider from "./api/authprovider";

const Layout = () => {
  return (
    <div className="cursor-pointer bg-first">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/room",
        element: <Room />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  );
}
