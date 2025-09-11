import { createBrowserRouter } from "react-router-dom";
import ThemeConfig from "./config/ThemeConfig";
import MainLayoutComponent from "./components/layouts/MainLayoutComponent";
import AuthLayout from "./components/layouts/AuthLayoutComponent";
import PrivateLayoutContent from "./components/layouts/PrivateLayoutContent";
import RootRedirect from "./config/guards/RootRedirect";
import PublicGuard from "./config/guards/PublicGuard";
import PrivateGuard from "./config/guards/PrivateGuard";
import RouteGuard from "./config/guards/RouteGuard";
import { JSX, lazy, Suspense } from "react";
import LoaderComponent from "./components/core/LoaderComponent";
import { SettingsPage } from "./pages/Catalogs/SettingsPage";
import { ForceNewUserChangePasswordPage } from "./pages/ForceNewUserChangePasswordPage";
import NewUserGuard from "./config/guards/NewUserGuard";

const LoginComponent = lazy(() => import("./pages/Auth/login/LoginComponent"));
const RegisterComponent = lazy(
  () => import("./pages/Auth/register/RegisterComponent")
);
const ResetPassword = lazy(
  () => import("./pages/Auth/reset-password/ResetPassword")
);
const RecoveryPassword = lazy(
  () => import("./pages/Auth/reset-password/RecoveryPassword")
);
const NotFoundComponent = lazy(
  () => import("./pages/Generic/NotFoundComponent")
);
const MainPage = lazy(() => import("./pages/Catalogs/MainPageComponent"));
const DecisionComponent = lazy(() => import("./pages/DecisionComponent"));

const withSuspense = (Component: JSX.Element) => (
  <Suspense fallback={<LoaderComponent />}>{Component}</Suspense>
);

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
                element: withSuspense(<LoginComponent />),
              },
              {
                path: "register",
                element: withSuspense(<RegisterComponent />),
              },
            ],
          },
        ],
      },
      {
        element: <PrivateGuard />,
        children: [
          {
            element: (
              <NewUserGuard>
                <PrivateLayoutContent />
              </NewUserGuard>
            ),
            children: [
              {
                path: ":method/:type/detalles",
                element: withSuspense(<MainPage />),
              },
              {
                path: ":method/:type/errores",
                element: withSuspense(<MainPage />),
              },
              {
                path: ":method/:type/categories/:categoryId",
                element: <RouteGuard>{withSuspense(<MainPage />)}</RouteGuard>,
              },
              {
                path: ":method/:type/collections/:caseId",
                element: <RouteGuard>{withSuspense(<MainPage />)}</RouteGuard>,
              },
              {
                path: "settings/:option",
                element: withSuspense(<SettingsPage />),
              },
            ],
          },
          {
            path: "home",
            element: (
              <NewUserGuard>{withSuspense(<DecisionComponent />)}</NewUserGuard>
            ),
          },
          {
            path: "change-password",
            element: withSuspense(<ForceNewUserChangePasswordPage />),
          },
        ],
      },
    ],
  },
]);

export default router;
