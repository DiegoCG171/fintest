import { createBrowserRouter } from "react-router-dom";
import ThemeConfig from "./config/ThemeConfig";
import MainLayoutComponent from "./layouts/MainLayoutComponent";
import SplashComponent from "./pages/SplashComponent";
import AuthLayout from "./layouts/AuthLayoutComponent";
import LoginComponent from "./pages/Auth/login/LoginComponent";
import RegisterComponent from "./pages/Auth/RegisterComponent";
import PrivateLayoutContent from "./layouts/PrivateLayoutContent";
import RootRedirect from "./guards/RootRedirect";
import PublicGuard from "./guards/PublicGuard";
import PrivateGuard from "./guards/PrivateGuard";
import NotFoundComponent from "./pages/Generic/NotFoundComponent";
import MainPage from "./pages/Catalogs/MainPageComponent";
import ResetPassword from "./pages/Auth/ResetPassword";
import RecoveryPassword from "./pages/Auth/RecoveryPassword";

const mainPageRoutes = [
  "main", 
  "ecommerce", 
  "ecommerce/ventas", 
  "ecommerce/reverso", 
  "ecommerce/cancelacion", 
  "ecommerce/ventas-ds", 
  "ecommerce/ventas-visa", 
  "ecommerce/ventas-mastercard", 
  "moto",
  "moto/ventas", 
  "moto/reverso", 
  "moto/cancelacion", 
  "moto/ventas-ds", 
  "moto/ventas-visa", 
  "moto/ventas-mastercard", 
];

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
            path: "reset-pssw",
            element: <ResetPassword />,
          },
          {
            path: "recovery-pssw",
            element: <RecoveryPassword />,
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
              ...mainPageRoutes.map((route) => ({
                path: route,
                element: <MainPage />,
              })),
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
