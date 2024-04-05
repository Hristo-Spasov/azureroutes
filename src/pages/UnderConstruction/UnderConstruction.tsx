import { Link } from "react-router-dom";
import style from "./UnderConstruction.module.scss";
import Github from "../../assets/socials/github.svg?react";
import Facebook from "../../assets/socials/facebook.svg?react";
import Instagram from "../../assets/socials/instagram.svg?react";

const UnderConstruction = () => {
  return (
    <>
      <div className={style.container}>
        <span className={style.socials}>
          <a
            rel="noopener noreferrer"
            href="https://github.com/Hristo-Spasov/azureroutes"
            target="_blank"
          >
            <Github width={30} height={30} />
          </a>
          <a
            rel="noopener noreferrer"
            href="http://facebook.com"
            target="_blank"
          >
            <Facebook width={30} height={30} />
          </a>
          <a
            rel="noopener noreferrer"
            href="http://instagram.com"
            target="_blank"
          >
            <Instagram width={30} height={30} />
          </a>
        </span>
        <div className={style.back_home}>
          <Link to="/">Get back Home?</Link>
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
