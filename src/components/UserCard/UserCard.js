import styles from "./UserCard.module.css";

const UserCard = ({ userInfo }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userCardBody}>
        <div className={styles.userCardLabel}>{userInfo.fullName}</div>
        <div className={styles.userCardLabel}>{userInfo.username}</div>
        <div className={styles.userCardLabel}>{userInfo.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
