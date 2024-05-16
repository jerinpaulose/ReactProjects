import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

interface RouteConfig {
  exact?: boolean;
  path: string;
  layout?: React.ComponentType<any>;
  element: React.ComponentType<any>;
  guard?: React.ComponentType<any>;
  routes?: RouteConfig[];
}

export const renderRoutes = (routes: RouteConfig[] = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route: RouteConfig, i: number) => {
        const Guard: React.FC = route.guard || Fragment;
        const Layout: React.FC = route.layout || Fragment;
        const Element: React.FC = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes: RouteConfig[] = [
  {
    exact: true,
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: true,
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: true,
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: true,
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
