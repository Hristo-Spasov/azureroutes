import { useState, useEffect } from "react";

/**
 * Custom hook that returns a boolean value indicating whether the viewport
 * is smaller or equal to the specified number.
 *
 * @param {number} number - The threshold number for viewport width.
 * @returns {boolean} A boolean value representing whether the viewport is smaller
 *                    or equal to the specified number.
 *
 * @example
 * // Usage example:
 * const isViewportSmall = useResize(600);
 * // ...
 * {isViewportSmall ? 'Viewport is small!' : 'Viewport is not small!'}
 */

const useResize = (number: number) => {
  const [inView, setInView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setInView(window.innerWidth <= number);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return inView;
};

export default useResize;
