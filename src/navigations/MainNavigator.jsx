import { ROUTES } from "../constants";
import { createBrowserRouter } from "react-router-dom";
import { Home, Landing } from "../pages";
import MainLayout from "../components/MainLayout";

const createMainRouter = ({ themeMode, onToggleTheme }) =>
  createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          path: ROUTES.INDEX,
          element: <Landing />,
        },
        {
          path: ROUTES.GENERATE_PROPOSAL,
          element: <Home themeMode={themeMode} onToggleTheme={onToggleTheme} />,
        },
      ],
    },
  ]);

export default createMainRouter;
