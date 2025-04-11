import "../styles/user-card.css";

export default function UserCard({ userInfo }) {
  return (
    <div className="user-card">
      <div className="user-card__body">
        <div className="user-card__label">{userInfo.fullName}</div>
        <div className="user-card__label">{userInfo.username}</div>
        <div className="user-card__label">{userInfo.email}</div>
      </div>
    </div>
  );
}
