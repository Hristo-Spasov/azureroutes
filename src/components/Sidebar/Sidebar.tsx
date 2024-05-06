import { motion } from "framer-motion";
import style from "./Sidebar.module.scss";
import { Squash as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  // Closing the sidebar when clicked outside of the bar
  useEffect(() => {
    const handleOutsideClick: EventListener = (event) => {
      // Exclude clicks on the hamburger button
      if (
        hamburgerRef.current &&
        hamburgerRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // Close the sidebar if the click is outside the sidebar
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);
  //Prevent scrolling when sidebar is open
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleScroll();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
      <div className={style.menu_button} ref={hamburgerRef}>
        <Hamburger toggled={isOpen} toggle={toggleMenu} color="#fff" rounded />
      </div>

      <motion.div
        ref={sidebarRef}
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
              <Link to="under-construction" className={style.link_elements}>
                Tickets
              </Link>
            </li>
            <li className={style.list_items}>
              <Link to="under-construction" className={style.link_elements}>
                Hotels
              </Link>
            </li>
            <li className={style.list_items}>
              <Link to="under-construction" className={style.link_elements}>
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
