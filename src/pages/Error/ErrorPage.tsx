import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import Header from "../../components/Header/Header";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.code}>404</h1>
        <h2>Oops,</h2>
        <p>Are you lost?</p>
        <Link to="/">Get back Home</Link>
      </div>
    </>
  );
};

export default ErrorPage;
