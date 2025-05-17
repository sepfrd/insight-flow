import { useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import Loader from "@/components/Loader";

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};
