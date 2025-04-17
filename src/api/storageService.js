import { clear, get, set } from "idb-keyval";
import { KEYS_VALUES } from "../utils/constants";

export const storageService = {
  storeProfileImageAsync: async (blob) => {
    await set(KEYS_VALUES.profileImageKey, blob);
    window.dispatchEvent(new Event(KEYS_VALUES.indexedDbUpdatedEventName));
  },
  loadProfileImageAsync: async () => {
    const blob = await get(KEYS_VALUES.profileImageKey);
    return blob;
  },
  getAuthToken: () => sessionStorage.getItem(KEYS_VALUES.authTokenKey),
  getAuthStatus: () => sessionStorage.getItem(KEYS_VALUES.authStatusKey),
  setAuthToken: (token) => sessionStorage.setItem(KEYS_VALUES.authTokenKey, token),
  setAuthStatus: (status) => sessionStorage.setItem(KEYS_VALUES.authStatusKey, status),
  clearIndexedDb: async () => await clear(),
  clearSessionStorage: () => sessionStorage.clear(),
};
