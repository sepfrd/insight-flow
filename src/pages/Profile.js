import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <div className="profile-container">
        <div className="profile-grid">
          <div className="user-info-item">
            <span className="profile-label">Username: </span>
            {userInfo.username}
          </div>
          <div className="user-info-item">
            <span className="profile-label">User UUID: </span> {userInfo.uuid}
          </div>
          <div className="user-info-item">
            <span className="profile-label">Role(s): </span>
            {userInfo.role}
          </div>
        </div>
      </div>
    </>
  );
}
