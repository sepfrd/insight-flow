import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storageService } from "../api/storageService";
import { userService } from "../api/userService";
import Uploader from "../components/Uploader";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/profile.css";
import { ToastContext } from "../contexts/ToastContext";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { userInfo, isAuthenticated, onLogout } = useContext(AuthContext);
  const { setMessage } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUploadModal(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      setMessage({ type: "error", text: "Please select a file." });
      return;
    }

    const response = await userService.uploadUserProfileImageAsync(file);

    if (response.isSuccess === true) {
      await storageService.storeProfileImageAsync(userInfo?.username, file);

      const url = URL.createObjectURL(file);

      setProfileImage(url);
    }

    setShowUploadModal(false);
  };

  useEffect(() => {
    const fetchProfileImageAsync = async () => {
      let storedImage = await storageService.loadProfileImageAsync(userInfo?.username);

      if (!storedImage) {
        storedImage = await userService.getUserProfileImageAsync();
        await storageService.storeProfileImageAsync(storedImage);
      }

      if (!storedImage) {
        return "Could not fetch profile image from either indexed DB or the backend API.";
      }

      const url = URL.createObjectURL(storedImage);

      setProfileImage(url);
    };

    if (!isAuthenticated) {
      onLogout();
      navigate("/");
      return;
    }

    fetchProfileImageAsync().then((error) => {
      if (error) {
        return error;
      }
    });
  }, [isAuthenticated, onLogout, userInfo, navigate]);

  return (
    <>
      <div className="profile">
        <div className="profile__image">
          <div className="image__container">
            <button
              className="image__update-button"
              onClick={() => setShowUploadModal(true)}>
              <i className="bi bi-upload" />
            </button>
            {profileImage ? (
              <img
                src={profileImage}
                alt="From server"
              />
            ) : (
              "No image..."
            )}
          </div>
        </div>
        <div className="profile__grid">
          <div className="profile__item">
            <span className="profile__label">Full Name: </span>
            {userInfo?.fullName}
          </div>
          <div className="profile__item">
            <span className="profile__label">Username: </span>
            {userInfo?.username}
          </div>
          <div className="profile__item">
            <span className="profile__label">Email: </span>
            {userInfo?.email}
          </div>
          <div className="profile__item">
            <span className="profile__label">Role(s): </span>
            {Array.isArray(userInfo?.roles) ? userInfo?.roles?.join(", ") : userInfo?.roles}
          </div>
          <div className="profile__item">
            <span className="profile__label">User UUID: </span> {userInfo?.uuid}
          </div>
        </div>
      </div>
      {showUploadModal && (
        <div
          className="modal__background--blurred"
          onClick={handleBackgroundClick}>
          <Uploader
            title={"Upload Profile Image"}
            handleUpload={handleUpload}
          />
        </div>
      )}
    </>
  );
}
