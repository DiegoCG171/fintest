import { lazy, LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

interface Route {
    path: string;
    to: string;
    component: LazyExoticComponent<JSXComponent> | JSXComponent,
    label: string;
    children?: Route[]
}


export const authRoutes: Route[] = [
    {
        label: 'login',
        path: 'login',
        to: 'login',
        component: lazy( () => import( /* webpackChunkName: "Login" */ '../../pages/Login/LoginPage') )
    },
    {
        label: 'create-account',
        path: 'create-account',
        to: 'create-account',
        component: lazy(() => import( /* webpackChunkName: "CreateAccount" */ '../../pages/CreateAccount/CreateAccountPage') )
    },
    {
        label: 'forgot-password',
        path: 'forgot-password',
        to: 'forgot-password',
        component: lazy( () => import( /* webpackChunkName: "ChangePassword" */ '../../pages/ForgotPasswordPage/ForgotPasswordPage') )
    },
    {
        label: 'verify-code',
        path: 'verify-code',
        to: 'verify-code',
        component: lazy( () => import( /* webpackChunkName: "ChangePassword" */ '../../pages/VerifyCode/VerifyCodePage') )
    },
    {
        label: 'reset-password',
        path: 'reset-password',
        to: 'reset-password',
        component: lazy( () => import( /* webpackChunkName: "ChangePassword" */ '../../pages/ResetPassword/ResetPasswordPage') )
    },
]