import "../styles/user-card.css";

export default function UserCard({ userRoles }) {
  return (
    <div className="user-card">
      <div className="user-card__body">
        <div className="user-card__label">{userRoles.fullName}</div>
        <div className="user-card__label">{userRoles.username}</div>
        <div className="user-card__label">{userRoles.email}</div>
      </div>
    </div>
  );
}
