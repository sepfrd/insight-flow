import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find what you were looking for.</p>
    </div>
  );
};

export default NotFound;
