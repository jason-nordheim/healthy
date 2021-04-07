import { useEffect, useState } from "react";

/**
 * Hook that to report window size
 * @returns {{width:{number}, height:{number}}}
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    height: undefined,
    width: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = (e) => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // add event listener
    window?.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};
