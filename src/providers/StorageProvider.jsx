import { KEYS_VALUES } from "@/utils/constants";
import { useEffect, useState } from "react";
import { StorageContext } from "@/contexts/StorageContext";

export const StorageProvider = ({ children }) => {
  const [storageUpdated, setStorageUpdated] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setStorageUpdated((prev) => !prev);
    };

    window.addEventListener(KEYS_VALUES.indexedDbUpdatedEventName, handleChange);

    return () => window.removeEventListener(KEYS_VALUES.indexedDbUpdatedEventName, handleChange);
  }, []);

  useEffect(() => {
    const handleChange = () => {
      window.location.reload();
    };

    window.addEventListener("storage", handleChange);

    return () => window.removeEventListener("storage", handleChange);
  }, []);

  return (
    <StorageContext.Provider
      value={{
        storageUpdated,
      }}>
      {children}
    </StorageContext.Provider>
  );
};
