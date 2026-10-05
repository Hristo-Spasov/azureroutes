import { useEffect } from "react";

export const useScriptLoader = <T extends HTMLElement>(
  url: string,
  ref: React.RefObject<T | null>
) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    const container = ref.current;

    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.removeChild(script);
      }
    };
  }, [url, ref]);
};

export default useScriptLoader;
