import { useContext, useEffect, useState } from "react";
import { storageService } from "../api/storageService";
import { userService } from "../api/userService";
import Uploader from "../components/Uploader";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/profile.css";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const fetchProfileImageAsync = async () => {
    let storedImage = await storageService.loadProfileImageAsync();

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

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUploadModal(false);
    }
  };

  const handleUpload = async (file) => {
    console.log(file);
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const response = await userService.uploadUserProfileImageAsync(file);

    if (response.isSuccess === true) {
      await storageService.storeProfileImageAsync(file);

      const url = URL.createObjectURL(file);

      setProfileImage(url);
    }

    setShowUploadModal(false);
  };

  useEffect(() => {
    fetchProfileImageAsync().then((error) => {
      if (!error) {
        console.log(error);
      }
    });
  }, []);

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
