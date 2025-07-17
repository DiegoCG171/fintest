import { createBrowserRouter } from "react-router-dom";
import ThemeConfig from "./config/ThemeConfig";
import MainLayoutComponent from "./components/layouts/MainLayoutComponent";
import AuthLayout from "./components/layouts/AuthLayoutComponent";
import LoginComponent from "./pages/Auth/login/LoginComponent";
import RegisterComponent from "./pages/Auth/register/RegisterComponent";
import PrivateLayoutContent from "./components/layouts/PrivateLayoutContent";
import RootRedirect from "./config/guards/RootRedirect";
import PublicGuard from "./config/guards/PublicGuard";
import PrivateGuard from "./config/guards/PrivateGuard";
import NotFoundComponent from "./pages/Generic/NotFoundComponent";
import MainPage from "./pages/Catalogs/MainPageComponent";
import ResetPassword from "./pages/Auth/reset-password/ResetPassword";
import RecoveryPassword from "./pages/Auth/reset-password/RecoveryPassword";
import RouteGuard from "./config/guards/RouteGuard";
import DecisionComponent from "./pages/DecisionComponent";

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
        path: "not-found",
        element: <NotFoundComponent />,
      },
      {
        element: <PublicGuard />,
        children: [
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
              {
                path: ":method/:type",
                element: (
                  <RouteGuard>
                    <MainPage />
                  </RouteGuard>
                ),
              },
              {
                path: ":method/:type/detalles",
                element: (
                  <MainPage />
                ),
              },
              {
                path: ":method/:type/errores",
                element: (
                  <MainPage />
                ),
              },
              {
                path: ":method/:type/categories/:categoryId",
                element: (
                  <RouteGuard>
                    <MainPage />
                  </RouteGuard>
                ),
              },
              {
                path: ":method/:type/collections/:caseId",
                element: (
                  <RouteGuard>
                    <MainPage />
                  </RouteGuard>
                ),
              },
            ],
          },
          {
            path: "home",
            element: <DecisionComponent />,
          },
        ],
      },
    ],
  },
]);

export default router;
