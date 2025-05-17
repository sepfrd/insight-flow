import { storageService } from "@/api/storageService";
import { userService } from "@/api/userService";
import { AuthContext } from "@/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const isAuthenticated = userInfo != null;

  useEffect(() => {
    const storedUserInfo = storageService.getUserInfo();

    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }

    setIsAuthLoaded(true);
  }, []);

  const onLogout = () => {
    storageService.deleteUserProfileImage(userInfo?.username);
    storageService.clearSessionStorage();
    setUserInfo(null);
    window.location.reload();
  };

  const onLogin = async (token) => {
    const decoded = jwtDecode(token);
    const information = await userService.getUserInformationAsync(token);
    const profileImage = await userService.getUserProfileImageAsync(token);

    const userInformation = {
      uuid: information.data.uuid,
      username: information.data.username,
      email: information.data.email,
      fullName: information.data.fullName,
      roles: decoded.roles,
    };

    storageService.storeAuthToken(token);
    storageService.storeUserInfo(userInformation);
    await storageService.storeProfileImageAsync(userInformation.username, profileImage);

    setUserInfo(userInformation);
    setIsAuthLoaded(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthLoaded,
        userInfo,
        isAuthenticated,
        onLogin,
        onLogout,
      }}>
      {!isAuthLoaded ? <span>Loading...</span> : children}
    </AuthContext.Provider>
  );
};
