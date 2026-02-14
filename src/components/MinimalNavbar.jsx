import { Link, useLocation } from "react-router-dom";
import { LNG } from "../language";
import { IMGS, ROUTES } from "@/constants";

const MinimalNavbar = () => {
  const copy = LNG.eng.minimalNavbar;
  const location = useLocation();

  if (!copy) return null;
  const isHomeRoute = location.pathname === ROUTES.INDEX;
  const containerClassName = [
    "absolute left-1/2 top-5 z-50 w-[92%] max-w-7xl -translate-x-1/2 mx-auto pointer-events-auto flex items-center justify-between rounded-full border border-white/10 px-2 py-3 backdrop-blur-md",
    isHomeRoute ? "bg-transparent" : "hidden",
  ].join(" ");

  return (
    <div className={containerClassName}>
      <nav className="w-full flex items-center justify-between">
        <Link
          to={ROUTES.INDEX}
          className="group flex items-center justify-center gap-1 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <img
            src={IMGS.LOGO}
            alt=""
            className="w-20 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-white text-xl font-bold transition-colors duration-300 group-hover:text-cyan-200">
            ProposeAI
          </span>
        </Link>

        <Link
          to={ROUTES.GENERATE_PROPOSAL}
          className="flex items-center justify-center rounded-lg bg-white !text-black px-4 py-3 hover:bg-white/80"
        >
          Get Started
        </Link>
      </nav>
    </div>
  );
};

export default MinimalNavbar;
