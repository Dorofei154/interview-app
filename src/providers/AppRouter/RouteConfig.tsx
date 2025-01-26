import { RouteProps } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import CurrenctDetailsPage from "../../pages/CurrencyDetailsPage/CurrencyDetailsPage";
import { AppRoutes } from "./AppRoutes.enum";
import { getRouteCurrencyDetails, getRouteMain } from "./router";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.CURRENCY_DETAILS]: {
    path: getRouteCurrencyDetails(":id"),
    element: <CurrenctDetailsPage />,
  },
};
