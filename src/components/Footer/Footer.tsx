import styles from "./Footer.module.scss";
import Github from "../../assets/socials/github.svg?react";
import Facebook from "../../assets/socials/facebook.svg?react";
import Instagram from "../../assets/socials/instagram.svg?react";
const Footer = () => {
  return (
    <section className={styles.footer_container}>
      <span className={styles.sitemap}>
        <h3>
          <strong>Sitemap</strong>
        </h3>
        <ul>
          <li>Home</li>
          <li>Tickets</li>
          <li>Hotels</li>
          <li>Rent A Car</li>
        </ul>
      </span>
      <span className={styles.socials}>
        <h3>Contact Us</h3>
        <span className={styles.icon_container}>
          <Github width={30} height={30} />
          <Facebook width={30} height={30} />
          <Instagram width={30} height={30} />
        </span>
      </span>
    </section>
  );
};

export default Footer;
