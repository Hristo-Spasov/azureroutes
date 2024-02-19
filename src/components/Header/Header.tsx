import style from "./Header.module.scss";
import logo from "../../public/logo.png";

const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <img src={logo} alt="skywise_logo" />
      <h1>SkyWise</h1>
      <span></span> {/* TODO navbar in the future */}
    </header>
  );
};

export default Header;
