import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
      <div className="profile">
        <div className="profile__grid">
          <div className="profile__item">
            <span className="profile__label">Username: </span>
            {userInfo?.username}
          </div>
          <div className="profile__item">
            <span className="profile__label">User UUID: </span> {userInfo?.uuid}
          </div>
          <div className="profile__item">
            <span className="profile__label">Role(s): </span>
            {userInfo?.roles.join(", ")}
          </div>
        </div>
      </div>
    </>
  );
}
