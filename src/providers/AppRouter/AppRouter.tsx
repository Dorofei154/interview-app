import { memo, Suspense, useCallback } from "react";
import { BrowserRouter, Route, RouteProps, Routes } from "react-router-dom";
import { routeConfig } from "./RouteConfig";
import { LoaderSpinner } from "../../shared";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = (
      <Suspense fallback={<LoaderSpinner />}>{route.element}</Suspense>
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return (
    <BrowserRouter>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </BrowserRouter>
  );
};

export default memo(AppRouter);
