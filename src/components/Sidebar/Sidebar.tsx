import { motion } from "framer-motion";
import style from "./Sidebar.module.scss";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.55, 0.085, 0.68, 0.53],
      },
    },
  };

  return (
    <>
      <div className={style.menu_button}>
        <Hamburger toggled={isOpen} toggle={toggleMenu} color="#fff" rounded />
      </div>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className={style.sidebar_container}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className={style.sidebar_inner}>
          <nav className={style.list_container}>
            <li className={style.list_items}>
              <Link to="/" className={style.link_elements}>
                Home
              </Link>
            </li>
            <li className={style.list_items}>
              <Link to="/" className={style.link_elements}>
                Tickets
              </Link>
            </li>
            <li className={style.list_items}>
              <Link to="/" className={style.link_elements}>
                Hotels
              </Link>
            </li>
            <li className={style.list_items}>
              <Link to="/" className={style.link_elements}>
                Rent A Car
              </Link>
            </li>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
