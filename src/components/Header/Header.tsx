import style from "./Header.module.scss";
import logo from "../../assets/trickkyyy_logovector_imageairplanewhite_and_blue_colors_20c5c259-2a25-41b0-bd0d-5dbb3e6c82e5.png";

const Header = (): JSX.Element => {
  return (
    <header className={style.header}>
      <img src={logo} alt="skywise_logo" />
      <h2>SkyWise</h2>
      <ul>
        <li>menu</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
    </header>
  );
};

export default Header;
