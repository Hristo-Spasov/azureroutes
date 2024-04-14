import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div id="outer-container" style={{ height: "100%", overflowX: "hidden" }}>
      <Header />
      <div id="page-wrap">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
