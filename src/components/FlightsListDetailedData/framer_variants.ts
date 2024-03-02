export const variants = {
  parent_container: {
    scale: 1,
  },
  initial: {
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "80px 80px 80px 80px",
    color: "rgb(0, 0, 0)",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  active: {
    backgroundColor: "rgba(31, 61, 96, 1)",
    borderRadius: "80px 80px 0px 0px",
    color: "rgb(255,255,255)",
  },
  hover_active: {
    outline: "2px solid rgba(31, 61, 96, 0)",
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover_inactive: {
    outline: "2px solid rgba(31, 61, 96, 1)",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
  codeInitial: {
    color: "rgba(31, 61, 96, 1)",
    // Set the initial color of the spans
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
  codeActive: {
    color: "rgb(255,255,255)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      delay: 0.3,
    }, // Set the active color of the spans
  },
  arrowInitial: {
    top: "100%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    backgroundColor: "rgb(255,255,255)",
    rotate: 0,
    borderRadius: "80px 80px 80px 80px",
  },
  arrowActive: {
    top: "100%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    backgroundColor: "rgba(31, 61, 96, 1)",
    borderRadius: "80px",
    rotate: "180deg",
  },
  arrowHoverActive: {
    borderRadius: "80px",
    y: "-40%",
    transition: {
      delay: 0,
      duration: 0,
    },
  },
  arrowHoverInactive: {
    borderRadius: "80px",
    y: "-40%",
    transition: {
      delay: 0,
      duration: 0,
    },
  },
};

export const mobileVariants = {
  initial: {
    backgroundColor: "rgb(255,255,255)",
    borderRadius: "20px 20px 20px 20px",
    color: "rgb(0, 0, 0)",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  active: {
    backgroundColor: "rgba(31, 61, 96, 1)",
    borderRadius: "80px 80px 0px 0px",
    color: "rgb(255,255,255)",
  },
  hover_active: {
    outline: "2px solid rgba(31, 61, 96, 0)",
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hover_inactive: {
    outline: "2px solid rgba(31, 61, 96, 1)",
    transition: {
      duration: 0.1,
      ease: "easeInOut",
    },
  },
};
