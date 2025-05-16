import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.threeBody}>
        <div className={styles.threeBodyDot} />
        <div className={styles.threeBodyDot} />
        <div className={styles.threeBodyDot} />
      </div>
    </div>
  );
};

export default Loader;
