import style from "./Header.module.scss";
// import logo from "../../public/logo.png";
import name from "../../assets/azure routes.png";

const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <img src={name} alt="Name" className={style.name} />
      <span>NavLink</span> {/* TODO navbar in the future */}
    </header>
  );
};

export default Header;
