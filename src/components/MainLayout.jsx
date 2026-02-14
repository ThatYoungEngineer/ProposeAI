import { Outlet } from "react-router-dom";
import MinimalNavbar from "./MinimalNavbar";

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <MinimalNavbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
