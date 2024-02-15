import style from "./Header.module.scss";
import logo from "../../assets/trickkyyy_logovector_imageairplanewhite_and_blue_colors_20c5c259-2a25-41b0-bd0d-5dbb3e6c82e5.png";

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
