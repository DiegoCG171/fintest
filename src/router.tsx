import { createBrowserRouter } from "react-router-dom";
import ThemeConfig from "./config/ThemeConfig";
import MainLayoutComponent from "./layouts/MainLayoutComponent";
import SplashComponent from "./pages/SplashComponent";
import AuthLayout from "./layouts/AuthLayoutComponent";
import LoginComponent from "./pages/Auth/login/LoginComponent";
import RegisterComponent from "./pages/Auth/RegisterComponent";
import PrivateLayoutContent from "./layouts/PrivateLayoutContent";
import EcommerceComponent from "./pages/Catalogs/EcommerceComponent";

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
            element: <SplashComponent />,
        },
        {
            element: <AuthLayout/>,
            children: [
                {
                    path: "login",
                    element: <LoginComponent />
                },
                {
                    path: "register",
                    element: <RegisterComponent />
                }
            ]
        },
        {
            element: <PrivateLayoutContent/>,
            children: [
                {
                    path: "ecommerce",
                    element: <EcommerceComponent />
                }
            ]
        }
        ],
    },
]);

export default router;
