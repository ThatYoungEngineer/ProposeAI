import { ROUTES } from "../constants";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages";

const MainNavigator = createBrowserRouter([
  {
    path: ROUTES.INDEX,
    Component: Home,
  },
]);

export default MainNavigator;
