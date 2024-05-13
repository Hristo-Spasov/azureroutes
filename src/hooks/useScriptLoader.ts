import { useEffect } from "react";

export const useScriptLoader = (
  url: string,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    if (ref.current) {
      ref.current.appendChild(script);
    }

    return () => {
      if (ref.current) {
        ref.current.removeChild(script);
      }
    };
  }, [url, ref]);
};

export default useScriptLoader;
