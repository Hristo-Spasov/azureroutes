import { useRef } from "react";
import useScriptLoader from "../../hooks/useScriptLoader";

const Transfers = () => {
  const transferRef = useRef<HTMLDivElement>(null);
  const url =
    "https://c1.travelpayouts.com/content?currency=EUR&promo_id=3879&hide_external_links=true&hide_form_extras=false&disable_currency_selector=false&transfer_options=MCR&transfer_options_limit=10&powered_by=true&locale=en&shmarker=546163&trs=320952";
  useScriptLoader(url, transferRef);

  return <div ref={transferRef}></div>;
};

export default Transfers;
