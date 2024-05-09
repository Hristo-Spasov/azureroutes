import style from "./Header.module.scss";
import name from "../../assets/azure routes.png";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import useResize from "../../hooks/useResize";

const Header = (): JSX.Element => {
  const isMobile = useResize(768);
  return (
    <header className={style.header}>
      <Link to="/">
        <img src={name} alt="Name" className={style.name} />
      </Link>
      {!isMobile ? (
        <div className={style.nav_container}>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="under-construction"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Tickets
          </NavLink>
          <NavLink
            to="under-construction"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Hotels
          </NavLink>
          <NavLink
            to="under-construction"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Rent A Car
          </NavLink>
        </div>
      ) : (
        <div className={style.mobile_menu}>
          <Sidebar />
        </div>
      )}
    </header>
  );
};

export default Header;
