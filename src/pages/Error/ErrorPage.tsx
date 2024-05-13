import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Link to="/">Get back Home?</Link>
      </div>
    </>
  );
};

export default ErrorPage;
