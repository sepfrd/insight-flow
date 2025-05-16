import { storageService } from "@/api/storageService";
import { userService } from "@/api/userService";
import Uploader from "@/components/Uploader/Uploader";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContext } from "@/contexts/ToastContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
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
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <div className={styles.imageContainer}>
            <button
              className={styles.imageUpdateButton}
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
        <div className={styles.profileGrid}>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Full Name: </span>
            {userInfo?.fullName}
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Username: </span>
            {userInfo?.username}
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Email: </span>
            {userInfo?.email}
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>Role(s): </span>
            {Array.isArray(userInfo?.roles) ? userInfo?.roles?.join(", ") : userInfo?.roles}
          </div>
          <div className={styles.profileItem}>
            <span className={styles.profileLabel}>User UUID: </span> {userInfo?.uuid}
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
};

export default Profile;
