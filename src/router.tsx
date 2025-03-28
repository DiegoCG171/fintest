import { createBrowserRouter } from "react-router-dom";
import ThemeConfig from "./config/ThemeConfig";
import MainLayoutComponent from "./layouts/MainLayoutComponent";
import SplashComponent from "./pages/SplashComponent";
import AuthLayout from "./layouts/AuthLayoutComponent";
import LoginComponent from "./pages/Auth/login/LoginComponent";
import RegisterComponent from "./pages/Auth/RegisterComponent";
import PrivateLayoutContent from "./layouts/PrivateLayoutContent";
import EcommerceComponent from "./pages/Catalogs/EcommerceComponent";
import RootRedirect from "./guards/RootRedirect";
import PublicGuard from "./guards/PublicGuard";
import PrivateGuard from "./guards/PrivateGuard";
import NotFoundComponent from "./pages/Generic/NotFoundComponent";
import MainPage from "./pages/Catalogs/MainPageComponent";

const router = createBrowserRouter([
  {
    element: (
      <ThemeConfig>
        <MainLayoutComponent />
      </ThemeConfig>
    ),
    children: [
      {
        path: "/",
        element: <RootRedirect />,
      },
      {
        path: "*",
        element: <NotFoundComponent />,
      },
      {
        element: <PublicGuard />,
        children: [
          {
            path: "home",
            element: <SplashComponent />,
          },
          {
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <LoginComponent />,
              },
              {
                path: "register",
                element: <RegisterComponent />,
              },
            ],
          },
        ],
      },
      {
        element: <PrivateGuard />,
        children: [
          {
            element: <PrivateLayoutContent />,
            children: [
              {
                path: "main",
                element: <MainPage />,
              },
              {
                path: "ecommerce",
                element: <EcommerceComponent />,
              },
              {
                path: "moto",
                element: <EcommerceComponent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
