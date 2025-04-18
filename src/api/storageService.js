import { del, get, set } from "idb-keyval";
import { KEYS_VALUES } from "../utils/constants";

export const storageService = {
  storeProfileImageAsync: async (username, blob) => {
    await set(`${KEYS_VALUES.profileImageKey}_${username}`, blob);
    window.dispatchEvent(new Event(KEYS_VALUES.indexedDbUpdatedEventName));
  },
  loadProfileImageAsync: async (username) => {
    const blob = await get(`${KEYS_VALUES.profileImageKey}_${username}`);
    return blob;
  },
  getAuthToken: () => sessionStorage.getItem(KEYS_VALUES.authTokenKey),
  getUserInfo: () => JSON.parse(sessionStorage.getItem(KEYS_VALUES.userInfoKey)),
  storeAuthToken: (token) => sessionStorage.setItem(KEYS_VALUES.authTokenKey, token),
  storeUserInfo: (info) => sessionStorage.setItem(KEYS_VALUES.userInfoKey, JSON.stringify(info)),
  deleteUserProfileImage: (username) => del(`${KEYS_VALUES.profileImageKey}_${username}`),
  clearSessionStorage: () => sessionStorage.clear(),
};
