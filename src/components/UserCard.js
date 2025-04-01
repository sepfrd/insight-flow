import "../styles/user-card.css";

export default function UserCard({ userInfo }) {
  return (
    <div className="user-card">
      <div className="user-card-body">
        <div className="user-card-label">{userInfo.fullName}</div>
        <div className="user-card-label">{userInfo.username}</div>
        <div className="user-card-label">{userInfo.email}</div>
      </div>
    </div>
  );
}
