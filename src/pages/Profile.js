import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const { userInfo } = useContext(AuthContext);

  return (
    <div class="dashboard-container">
      <aside class="sidebar">
        <h2>User Dashboard</h2>
        <ul>
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#posts">My Blog Posts</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </aside>

      <main class="content">
        <section
          id="profile"
          class="card">
          <h2>Profile</h2>
          <p>
            <strong>Username:</strong> johndoe
          </p>
          <p>
            <strong>Email:</strong> johndoe@example.com
          </p>
        </section>

        <section
          id="posts"
          class="card">
          <h2>My Blog Posts</h2>
          <ul>
            <li>
              <a href="#">Understanding React Hooks</a>
            </li>
            <li>
              <a href="#">Building a REST API with Node.js</a>
            </li>
            <li>
              <a href="#">CSS Grid vs Flexbox</a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );

  // return (
  //   <>
  //     <div className="user-section">
  //       <div className="profile-grid">
  //         <div className="user-info-label">Username: {userInfo.username}</div>
  //         <div className="user-info-label">User UUID: {userInfo.uuid}</div>
  //         <div className="user-info-label">User Role(s): {userInfo.role}</div>
  //       </div>
  //       <NavLink
  //         className="nav-item"
  //         to={"/my-blog-posts"}>
  //         My Blog Posts
  //       </NavLink>
  //     </div>
  //   </>
  // );
}
