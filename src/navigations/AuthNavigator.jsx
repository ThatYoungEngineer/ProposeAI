import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import { Login } from "../pages";

const AuthNavigator = createBrowserRouter([
  {
    path: ROUTES.INDEX,
    Component: Login,
  },
]);

export default AuthNavigator;
