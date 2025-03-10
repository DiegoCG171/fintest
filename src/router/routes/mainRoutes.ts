import { lazy, LazyExoticComponent } from 'react';

type JSXComponent = () => JSX.Element;

interface Route {
    path: string;
    to: string;
    component: LazyExoticComponent<JSXComponent> | JSXComponent,
    label: string;
    children?: Route[]
}


export const mainRoutes: Route[] = [
    {
        label: 'home',
        path: 'home',
        to: 'home',
        component: lazy( () => import('../../pages/Home/HomePage') )
    },
    {
        label: 'test',
        path: 'test',
        to: 'test',
        component: lazy( () => import('../../pages/Simulator/Simulator') )
    },
]