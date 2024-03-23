import styles from "./Footer.module.scss";
import Github from "../../assets/socials/github.svg?react";
import Facebook from "../../assets/socials/facebook.svg?react";
import Instagram from "../../assets/socials/instagram.svg?react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useResize from "../../hooks/useResize";
const Footer = () => {
  const mobile = useResize(600);
  return (
    <section className={styles.footer_container}>
      <div className={styles.content_wrapper}>
        <span className={styles.socials}>
          <a
            rel="noopener noreferrer"
            href="https://github.com/Hristo-Spasov/azureroutes"
            target="_blank"
          >
            <Github width={40} height={40} />
          </a>
          <a
            rel="noopener noreferrer"
            href="http://facebook.com"
            target="_blank"
          >
            <Facebook width={40} height={40} />
          </a>
          <a
            rel="noopener noreferrer"
            href="http://instagram.com"
            target="_blank"
          >
            <Instagram width={40} height={40} />
          </a>
        </span>
        <span className={styles.footer_nav_container}>
          <nav className={styles.footer_nav}>
            <Link to="/">Home</Link>
            {mobile && <hr />}
            <Link to="/">Tickets</Link>
            {mobile && <hr />}
            <Link to="/">Hotels</Link>
            {mobile && <hr />}
            <Link to="/">Rent A Car</Link>
            {mobile && <hr />}
          </nav>
        </span>
      </div>

      <p>{`Copyright © 2024 - ${dayjs().year()} Azure Routes. All rights reserved.`}</p>
    </section>
  );
};

export default Footer;
